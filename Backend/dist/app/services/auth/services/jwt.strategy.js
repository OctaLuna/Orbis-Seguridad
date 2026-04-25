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
exports.JwtStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const passport_jwt_1 = require("passport-jwt");
const jwt_config_1 = require("../../../../config/services/jwt.config");
const usuarios_service_1 = require("../../../../modules/usuarios/services/usuarios.service");
const roles_const_1 = require("../../../../shared/constants/roles.const");
let JwtStrategy = class JwtStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy) {
    jwtConfig;
    usuariosService;
    constructor(jwtConfig, usuariosService) {
        const { secret } = jwtConfig.get();
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: secret,
        });
        this.jwtConfig = jwtConfig;
        this.usuariosService = usuariosService;
    }
    async validate(payload) {
        if (!payload) {
            throw new common_1.UnauthorizedException({
                message: 'Token inválido'
            });
        }
        const data = { sub: payload.sub, usuario: payload.usuario, rol: payload.rol, must_change_password: payload.must_change_password ?? false };
        const usuario = await this.usuariosService.findOne(data.sub, {
            throwException: false,
        });
        if (!usuario) {
            throw new common_1.UnauthorizedException({
                message: 'Token inválido'
            });
        }
        if (usuario.idRol !== roles_const_1.RolesEnum.TEMPORAL) {
            return data;
        }
        if (!usuario.expiracion) {
            throw new common_1.UnauthorizedException({
                message: 'Usuario invalido'
            });
        }
        const now = new Date();
        if (usuario.expiracion.getTime() <= now.getTime()) {
            throw new common_1.UnauthorizedException({
                message: 'Cuenta expirada'
            });
        }
        return data;
    }
};
exports.JwtStrategy = JwtStrategy;
exports.JwtStrategy = JwtStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_config_1.MyJwtConfig,
        usuarios_service_1.UsuariosService])
], JwtStrategy);
//# sourceMappingURL=jwt.strategy.js.map