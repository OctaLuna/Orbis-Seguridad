import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosAuthService } from 'src/modules/usuarios/services/usuarios-auth.service';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { UsuariosService } from 'src/modules/usuarios/services/usuarios.service';
import { comparePassword } from 'src/common/utils';
import { MyJwtConfig } from 'src/config/services/jwt.config';
import { JwtService } from '@nestjs/jwt';
import { Rol, RolesEnum } from 'src/shared/constants/roles.const';
import { ConfigService } from '@nestjs/config';
import { EmailService } from 'src/shared/services/email/email.service';
import { addMinutes } from 'date-fns';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
	constructor(
		private readonly usuariosAuthService: UsuariosAuthService,
		private readonly usuariosService: UsuariosService,
		private readonly jwtConfig: MyJwtConfig,
		private readonly jwtService: JwtService,
		private readonly configService: ConfigService,
		private readonly emailService: EmailService,
	) { }

	async register(data: RegisterDto) {
		let usuario = await this.usuariosService.findByUsuario(data.usuario, {
			throwException: false
		});
		let usuarioCorreo = await this.usuariosService.findOneByCorreo(data.correo, {
			throwException: false
		});
		if (usuario) {
			throw new ConflictException({
				message: 'El usuario ingresado ya es encuentra registrado'
			});
		}
		if (usuarioCorreo) {
			throw new ConflictException({
				message: 'Ya exite un usuario con el mismo correo'
			})
		}

		let newUsuario = await this.usuariosAuthService.create({
			...data,
			idRol: data.idRol ?? Rol.VISITANTE
		});

		return newUsuario;
	}

	async login(data: LoginDto) {
		const MAX_ATTEMPTS = this.configService.get<number>('MAX_LOGIN_ATTEMPTS', 3);
		const LOCKOUT_MINUTES = this.configService.get<number>('LOCKOUT_MINUTES', 30);

		// Aceptar alias con o sin dominio: "octavio.luna" y "octavio.luna@orbis.com" son equivalentes
		const alias = data.usuario.toLowerCase().replace(/@orbis\.com$/i, '').trim();
		const usuario = await this.usuariosService.findByUsuario(alias);
		if (!usuario) {
			throw new UnauthorizedException({ message: 'Credenciales incorrectas' });
		}

		// Verificar expiración de cuenta temporal antes del chequeo de bloqueo
		if (usuario.idRol === RolesEnum.TEMPORAL && usuario.expiracion && usuario.expiracion.getTime() <= Date.now()) {
			throw new UnauthorizedException({ message: 'Credenciales incorrectas' });
		}

		// Auto-desbloqueo si el período de bloqueo ya expiró
		if (usuario.isLocked && usuario.lockedAt) {
			const unlockTime = addMinutes(usuario.lockedAt, LOCKOUT_MINUTES);
			if (new Date() >= unlockTime) {
				await this.usuariosService.desbloquearCuenta(usuario.id);
				usuario.isLocked = false;
				usuario.failedAttempts = 0;
			}
		}

		if (usuario.isLocked) {
			throw new UnauthorizedException({
				message: `Cuenta bloqueada. Intenta en ${LOCKOUT_MINUTES} min o solicita desbloqueo al administrador.`,
			});
		}

		const passwordOk = await comparePassword(data.contrasenia, usuario.contrasenia);
		if (!passwordOk) {
			const newCount = (usuario.failedAttempts ?? 0) + 1;
			if (newCount >= MAX_ATTEMPTS) {
				await this.usuariosService.bloquearCuenta(usuario.id);
				if (usuario.correoReal) {
					this.emailService.enviarCuentaBloqueada(usuario.correoReal, usuario.usuario);
				}
				throw new UnauthorizedException({
					message: `Cuenta bloqueada por ${LOCKOUT_MINUTES} min tras ${MAX_ATTEMPTS} intentos fallidos.`,
				});
			}
			await this.usuariosService.incrementarIntentos(usuario.id, newCount);
			throw new UnauthorizedException({
				message: `Credenciales incorrectas. Intentos restantes: ${MAX_ATTEMPTS - newCount}.`,
			});
		}

		// Resetear intentos fallidos en login exitoso
		if ((usuario.failedAttempts ?? 0) > 0) {
			await this.usuariosService.incrementarIntentos(usuario.id, 0);
		}

		// Verificar si la contraseña expiró
		let mustChangePassword = usuario.mustChangePassword ?? false;
		if (!mustChangePassword && usuario.passwordExpiresAt && new Date() > usuario.passwordExpiresAt) {
			mustChangePassword = true;
			await this.usuariosService.marcarPasswordExpirado(usuario.id);
		}

		const payload = {
			sub: usuario.id,
			usuario: usuario.usuario,
			rol: usuario.idRol,
			must_change_password: mustChangePassword,
		};
		const { secret, expiresIn } = this.jwtConfig.get();
		const token = this.jwtService.sign(payload, { secret, expiresIn });
		return {
			message: 'Login exitoso',
			access_token: token,
			idUsuario: usuario.id,
			idRol: usuario.idRol,
			must_change_password: mustChangePassword,
		};
	}

	// --- M-07: Recuperación de contraseña ---

	async solicitarResetPassword(correo: string): Promise<void> {
		const RESET_MINUTES = this.configService.get<number>('RESET_TOKEN_EXPIRES_MINUTES', 30);
		const frontendUrl = this.configService.get<string>('FRONTEND_URL', 'http://localhost:3000');

		const usuario = await this.usuariosService.findByAnyEmail(correo);
		if (!usuario) return; // respuesta silenciosa para no revelar existencia de cuenta

		const rawToken = crypto.randomBytes(32).toString('hex');
		const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');
		const expires = addMinutes(new Date(), RESET_MINUTES);

		await this.usuariosService.guardarResetToken(usuario.id, tokenHash, expires);

		const resetUrl = `${frontendUrl}/reset-password?token=${rawToken}`;
		const correoDestino = usuario.correoReal || usuario.correo;
		this.emailService.enviarResetPassword(correoDestino, resetUrl, RESET_MINUTES);
	}

	async validarTokenReset(token: string): Promise<{ valido: boolean }> {
		const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
		const usuario = await this.usuariosService.findByResetToken(tokenHash);
		const valido =
			!!usuario &&
			!!usuario.resetTokenExpires &&
			new Date() <= usuario.resetTokenExpires;
		return { valido };
	}

	async confirmarResetPassword(token: string, passwordNuevo: string): Promise<void> {
		const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
		const usuario = await this.usuariosService.findByResetToken(tokenHash);
		if (!usuario || !usuario.resetTokenExpires || new Date() > usuario.resetTokenExpires) {
			throw new BadRequestException({ message: 'Token inválido o expirado' });
		}
		await this.usuariosService.resetearPassword(usuario.id, passwordNuevo);
		const correoDestino = usuario.correoReal || usuario.correo;
		this.emailService.enviarPasswordCambiada(correoDestino);
	}
}
