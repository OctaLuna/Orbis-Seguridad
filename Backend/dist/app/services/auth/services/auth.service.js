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
let AuthService = class AuthService {
    usuariosAuthService;
    usuariosService;
    jwtConfig;
    jwtService;
    constructor(usuariosAuthService, usuariosService, jwtConfig, jwtService) {
        this.usuariosAuthService = usuariosAuthService;
        this.usuariosService = usuariosService;
        this.jwtConfig = jwtConfig;
        this.jwtService = jwtService;
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
            idRol: data.idRol ?? roles_const_1.RolesEnum.INVESTIGADOR
        });
        return newUsuario;
    }
    async login(data) {
        let usuario = await this.usuariosService.findByUsuario(data.usuario);
        if (!usuario || !(await (0, utils_1.comparePassword)(data.contrasenia, usuario.contrasenia))) {
            throw new common_1.UnauthorizedException({
                message: 'Credenciales incorrectas'
            });
        }
        if (usuario.idRol === roles_const_1.RolesEnum.TEMPORAL) {
            if (usuario.expiracion.getTime() <= new Date().getTime()) {
                console.log(usuario.expiracion.getTime());
                console.log(new Date().getTime());
                throw new common_1.UnauthorizedException({
                    message: 'Credenciales incorrectas'
                });
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
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [usuarios_auth_service_1.UsuariosAuthService,
        usuarios_service_1.UsuariosService,
        jwt_config_1.MyJwtConfig,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map