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
exports.UsuariosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const usuario_entity_1 = require("../entities/usuario.entity");
const typeorm_2 = require("typeorm");
const classes_1 = require("../../../common/classes");
const roles_const_1 = require("../../../shared/constants/roles.const");
let UsuariosService = class UsuariosService {
    usuarioRepository;
    constructor(usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
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
};
exports.UsuariosService = UsuariosService;
exports.UsuariosService = UsuariosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(usuario_entity_1.Usuario)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsuariosService);
//# sourceMappingURL=usuarios.service.js.map