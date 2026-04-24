import { ConflictException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuariosAuthService } from 'src/modules/usuarios/services/usuarios-auth.service';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { UsuariosService } from 'src/modules/usuarios/services/usuarios.service';
import { comparePassword } from 'src/common/utils';
import { MyJwtConfig } from 'src/config/services/jwt.config';
import { JwtService } from '@nestjs/jwt';
import { RolesEnum } from 'src/shared/constants/roles.const';

@Injectable()
export class AuthService {
	constructor(
		private readonly usuariosAuthService: UsuariosAuthService,
		private readonly usuariosService: UsuariosService,
		private readonly jwtConfig: MyJwtConfig,
		private readonly jwtService: JwtService
	) { }

	async register(data: RegisterDto) {
		let usuario = await this.usuariosService.findByUsuario(data.usuario,{
			throwException: false
		});
		let usuarioCorreo = await this.usuariosService.findOneByCorreo(data.correo,{
			throwException: false
		});
		if (usuario) {
			throw new ConflictException({
				message: 'El usuario ingresado ya es encuentra registrado'
			});
		}
		if (usuarioCorreo){
			throw new ConflictException({
				message: 'Ya exite un usuario con el mismo correo'
			})
		}

		let newUsuario = await this.usuariosAuthService.create({
			...data,
			idRol: data.idRol ?? RolesEnum.INVESTIGADOR
		});

		return newUsuario;
	}

	async login(data: LoginDto) {
		let usuario = await this.usuariosService.findByUsuario(data.usuario);
		if (!usuario || !(await comparePassword(data.contrasenia, usuario.contrasenia))){
			throw new UnauthorizedException({
				message: 'Credenciales incorrectas'
			});
		}
		if (usuario!.idRol === RolesEnum.TEMPORAL){
			if (usuario!.expiracion!.getTime() <=new Date().getTime()){
				console.log(usuario!.expiracion!.getTime())
				console.log(new Date().getTime())
				throw new UnauthorizedException({
					message: 'Credenciales incorrectas'
				})
			}
		}
		const payload = {
			sub: usuario.id,
			usuario: usuario.usuario,
			rol: usuario.idRol,
		};
		const { secret, expiresIn } = this.jwtConfig.get();
		const token = this.jwtService.sign(payload, { secret, expiresIn });
		return {
			message: 'Login exitoso',
			access_token: token,
			idUsuario: usuario.id,
			idRol: usuario.idRol
		};

	}
}
