"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const usuarios_auth_service_1 = require("../../../../modules/usuarios/services/usuarios-auth.service");
const usuarios_service_1 = require("../../../../modules/usuarios/services/usuarios.service");
const utils_1 = require("../../../../common/utils");
const jwt_config_1 = require("../../../../config/services/jwt.config");
const jwt_1 = require("@nestjs/jwt");
const roles_const_1 = require("../../../../shared/constants/roles.const");
const config_1 = require("@nestjs/config");
const email_service_1 = require("../../../../shared/services/email/email.service");
const date_fns_1 = require("date-fns");
const crypto = require("crypto");
let AuthService = class AuthService {
    usuariosAuthService;
    usuariosService;
    jwtConfig;
    jwtService;
    configService;
    emailService;
    constructor(usuariosAuthService, usuariosService, jwtConfig, jwtService, configService, emailService) {
        this.usuariosAuthService = usuariosAuthService;
        this.usuariosService = usuariosService;
        this.jwtConfig = jwtConfig;
        this.jwtService = jwtService;
        this.configService = configService;
        this.emailService = emailService;
    }
    async register(data) {
        let usuario = await this.usuariosService.findByUsuario(data.usuario, {
            throwException: false
        });
        let usuarioCorreo = await this.usuariosService.findOneByCorreo(data.correo, {
            throwException: false
        });
        if (usuario) {
            throw new common_1.ConflictException({
                message: 'El usuario ingresado ya es encuentra registrado'
            });
        }
        if (usuarioCorreo) {
            throw new common_1.ConflictException({
                message: 'Ya exite un usuario con el mismo correo'
            });
        }
        let newUsuario = await this.usuariosAuthService.create({
            ...data,
            idRol: data.idRol ?? roles_const_1.Rol.VISITANTE
        });
        return newUsuario;
    }
    async login(data) {
        const MAX_ATTEMPTS = this.configService.get('MAX_LOGIN_ATTEMPTS', 3);
        const LOCKOUT_MINUTES = this.configService.get('LOCKOUT_MINUTES', 30);
        const alias = data.usuario.toLowerCase().replace(/@orbis\.com$/i, '').trim();
        const usuario = await this.usuariosService.findByUsuario(alias);
        if (!usuario) {
            throw new common_1.UnauthorizedException({ message: 'Credenciales incorrectas' });
        }
        if (usuario.idRol === roles_const_1.RolesEnum.TEMPORAL && usuario.expiracion && usuario.expiracion.getTime() <= Date.now()) {
            throw new common_1.UnauthorizedException({ message: 'Credenciales incorrectas' });
        }
        if (usuario.isLocked && usuario.lockedAt) {
            const unlockTime = (0, date_fns_1.addMinutes)(usuario.lockedAt, LOCKOUT_MINUTES);
            if (new Date() >= unlockTime) {
                await this.usuariosService.desbloquearCuenta(usuario.id);
                usuario.isLocked = false;
                usuario.failedAttempts = 0;
            }
        }
        if (usuario.isLocked) {
            throw new common_1.UnauthorizedException({
                message: `Cuenta bloqueada. Intenta en ${LOCKOUT_MINUTES} min o solicita desbloqueo al administrador.`,
            });
        }
        const passwordOk = await (0, utils_1.comparePassword)(data.contrasenia, usuario.contrasenia);
        if (!passwordOk) {
            const newCount = (usuario.failedAttempts ?? 0) + 1;
            if (newCount >= MAX_ATTEMPTS) {
                await this.usuariosService.bloquearCuenta(usuario.id);
                if (usuario.correoReal) {
                    this.emailService.enviarCuentaBloqueada(usuario.correoReal, usuario.usuario);
                }
                throw new common_1.UnauthorizedException({
                    message: `Cuenta bloqueada por ${LOCKOUT_MINUTES} min tras ${MAX_ATTEMPTS} intentos fallidos.`,
                });
            }
            await this.usuariosService.incrementarIntentos(usuario.id, newCount);
            throw new common_1.UnauthorizedException({
                message: `Credenciales incorrectas. Intentos restantes: ${MAX_ATTEMPTS - newCount}.`,
            });
        }
        if ((usuario.failedAttempts ?? 0) > 0) {
            await this.usuariosService.incrementarIntentos(usuario.id, 0);
        }
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
    async solicitarResetPassword(correo) {
        const RESET_MINUTES = this.configService.get('RESET_TOKEN_EXPIRES_MINUTES', 30);
        const frontendUrl = this.configService.get('FRONTEND_URL', 'http://localhost:3000');
        const usuario = await this.usuariosService.findByAnyEmail(correo);
        if (!usuario)
            return;
        const rawToken = crypto.randomBytes(32).toString('hex');
        const tokenHash = crypto.createHash('sha256').update(rawToken).digest('hex');
        const expires = (0, date_fns_1.addMinutes)(new Date(), RESET_MINUTES);
        await this.usuariosService.guardarResetToken(usuario.id, tokenHash, expires);
        const resetUrl = `${frontendUrl}/reset-password?token=${rawToken}`;
        const correoDestino = usuario.correoReal || usuario.correo;
        this.emailService.enviarResetPassword(correoDestino, resetUrl, RESET_MINUTES);
    }
    async validarTokenReset(token) {
        const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
        const usuario = await this.usuariosService.findByResetToken(tokenHash);
        const valido = !!usuario &&
            !!usuario.resetTokenExpires &&
            new Date() <= usuario.resetTokenExpires;
        return { valido };
    }
    async confirmarResetPassword(token, passwordNuevo) {
        const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
        const usuario = await this.usuariosService.findByResetToken(tokenHash);
        if (!usuario || !usuario.resetTokenExpires || new Date() > usuario.resetTokenExpires) {
            throw new common_1.BadRequestException({ message: 'Token inválido o expirado' });
        }
        await this.usuariosService.resetearPassword(usuario.id, passwordNuevo);
        const correoDestino = usuario.correoReal || usuario.correo;
        this.emailService.enviarPasswordCambiada(correoDestino);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [usuarios_auth_service_1.UsuariosAuthService,
        usuarios_service_1.UsuariosService,
        jwt_config_1.MyJwtConfig,
        jwt_1.JwtService,
        config_1.ConfigService,
        email_service_1.EmailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map