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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosService = exports.CambiarPasswordDto = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const usuario_entity_1 = require("../entities/usuario.entity");
const typeorm_2 = require("typeorm");
const classes_1 = require("../../../common/classes");
const roles_const_1 = require("../../../shared/constants/roles.const");
const class_validator_1 = require("class-validator");
const bcrypt = require("bcrypt");
const date_fns_1 = require("date-fns");
const password_validator_service_1 = require("../../../common/services/password-validator.service");
const password_history_service_1 = require("./password-history.service");
class CambiarPasswordDto {
    passwordActual;
    passwordNuevo;
}
exports.CambiarPasswordDto = CambiarPasswordDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CambiarPasswordDto.prototype, "passwordActual", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CambiarPasswordDto.prototype, "passwordNuevo", void 0);
let UsuariosService = class UsuariosService {
    usuarioRepository;
    passwordValidator;
    passwordHistoryService;
    constructor(usuarioRepository, passwordValidator, passwordHistoryService) {
        this.usuarioRepository = usuarioRepository;
        this.passwordValidator = passwordValidator;
        this.passwordHistoryService = passwordHistoryService;
    }
    create(createUsuarioDto) {
        return 'This action adds a new usuario';
    }
    async findAll() {
        const usuario = await this.usuarioRepository.find({
            select: {
                id: true,
                usuario: true,
                correo: true,
                idRol: true,
                expiracion: true
            }
        });
        return usuario;
    }
    async findByUsuario(usuario, options) {
        const finalOptions = new classes_1.OptionsFindOne();
        if (options) {
            Object.assign(finalOptions, options);
        }
        const repo = !finalOptions.manager ? this.usuarioRepository : finalOptions.manager.getRepository(usuario_entity_1.Usuario);
        const u = await repo.findOne({
            where: {
                usuario: usuario,
            },
        });
        if (!u && finalOptions.throwException) {
            throw new common_1.NotFoundException({
                message: 'Usuario no encontrado',
            });
        }
        return u;
    }
    async findOne(id, options) {
        const finalOptions = new classes_1.OptionsFindOne();
        if (options) {
            Object.assign(finalOptions, options);
        }
        const repo = !finalOptions.manager ? this.usuarioRepository : finalOptions.manager.getRepository(usuario_entity_1.Usuario);
        const u = await repo.findOne({
            where: {
                id: id,
            },
        });
        if (!u) {
            if (finalOptions.throwException) {
                throw new common_1.NotFoundException({
                    message: 'Usuario no encontrado',
                });
            }
            return null;
        }
        if (u.idRol === roles_const_1.RolesEnum.TEMPORAL &&
            u.expiracion &&
            u.expiracion.getTime() <= new Date().getTime()) {
            if (finalOptions.throwException) {
                throw new common_1.NotFoundException({
                    message: 'Usuario no encontrado',
                });
            }
            return null;
        }
        return u;
    }
    async cambiarPassword(idUsuario, dto) {
        const usuario = await this.usuarioRepository.findOneBy({ id: idUsuario });
        if (!usuario)
            throw new common_1.NotFoundException('Usuario no encontrado');
        if (!usuario.mustChangePassword) {
            if (!dto.passwordActual) {
                throw new common_1.BadRequestException('La contraseña actual es requerida');
            }
            const actualValida = await bcrypt.compare(dto.passwordActual, usuario.contrasenia);
            if (!actualValida) {
                throw new common_1.BadRequestException('La contraseña actual es incorrecta');
            }
        }
        this.passwordValidator.validar(dto.passwordNuevo);
        await this.passwordHistoryService.verificarReutilizacion(idUsuario, dto.passwordNuevo);
        const nuevoHash = await bcrypt.hash(dto.passwordNuevo, 12);
        await this.passwordHistoryService.guardarEnHistorial(idUsuario, nuevoHash);
        await this.usuarioRepository.update(idUsuario, {
            contrasenia: nuevoHash,
            mustChangePassword: false,
            passwordChangedAt: new Date(),
            passwordExpiresAt: (0, date_fns_1.addDays)(new Date(), 60),
            failedAttempts: 0,
            resetToken: undefined,
            resetTokenExpires: undefined,
        });
    }
    async desbloquearCuenta(id) {
        await this.usuarioRepository.update(id, {
            isLocked: false,
            failedAttempts: 0,
            lockedAt: null,
        });
    }
    async bloquearCuenta(id) {
        await this.usuarioRepository.update(id, {
            isLocked: true,
            lockedAt: new Date(),
        });
    }
    async incrementarIntentos(id, count) {
        await this.usuarioRepository.update(id, { failedAttempts: count });
    }
    async marcarPasswordExpirado(id) {
        await this.usuarioRepository.update(id, { mustChangePassword: true });
    }
    async findOneByCorreo(correo, options) {
        const finalOptions = new classes_1.OptionsFindOne();
        if (options) {
            Object.assign(finalOptions, options);
        }
        const repo = !finalOptions.manager ? this.usuarioRepository : finalOptions.manager.getRepository(usuario_entity_1.Usuario);
        const u = await repo.findOne({
            where: {
                correo: correo,
            },
        });
        if (!u) {
            if (finalOptions.throwException) {
                throw new common_1.NotFoundException({
                    message: 'Usuario no encontrado',
                });
            }
            return null;
        }
        if (u.idRol === roles_const_1.RolesEnum.TEMPORAL &&
            u.expiracion &&
            u.expiracion.getTime() <= new Date().getTime()) {
            if (finalOptions.throwException) {
                throw new common_1.NotFoundException({
                    message: 'Usuario no encontrado',
                });
            }
            return null;
        }
        return u;
    }
    async findByAnyEmail(email) {
        const byReal = await this.usuarioRepository.findOne({ where: { correoReal: email } });
        if (byReal)
            return byReal;
        return this.usuarioRepository.findOne({ where: { correo: email } });
    }
    async guardarResetToken(id, tokenHash, expires) {
        await this.usuarioRepository.update(id, {
            resetToken: tokenHash,
            resetTokenExpires: expires,
        });
    }
    async findByResetToken(tokenHash) {
        return this.usuarioRepository.findOne({ where: { resetToken: tokenHash } });
    }
    async resetearPassword(id, passwordNuevo) {
        const usuario = await this.usuarioRepository.findOneBy({ id });
        if (!usuario)
            throw new common_1.NotFoundException('Usuario no encontrado');
        this.passwordValidator.validar(passwordNuevo);
        await this.passwordHistoryService.verificarReutilizacion(id, passwordNuevo);
        const nuevoHash = await bcrypt.hash(passwordNuevo, 12);
        await this.passwordHistoryService.guardarEnHistorial(id, nuevoHash);
        await this.usuarioRepository.update(id, {
            contrasenia: nuevoHash,
            mustChangePassword: false,
            passwordChangedAt: new Date(),
            passwordExpiresAt: (0, date_fns_1.addDays)(new Date(), 60),
            failedAttempts: 0,
            isLocked: false,
            lockedAt: null,
            resetToken: null,
            resetTokenExpires: null,
        });
    }
};
exports.UsuariosService = UsuariosService;
exports.UsuariosService = UsuariosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(usuario_entity_1.Usuario)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        password_validator_service_1.PasswordValidatorService,
        password_history_service_1.PasswordHistoryService])
], UsuariosService);
//# sourceMappingURL=usuarios.service.js.map