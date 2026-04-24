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
exports.UsuariosAuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const usuario_entity_1 = require("../entities/usuario.entity");
const typeorm_2 = require("typeorm");
const utils_1 = require("../../../common/utils");
const roles_const_1 = require("../../../shared/constants/roles.const");
const usuarios_service_1 = require("./usuarios.service");
let UsuariosAuthService = class UsuariosAuthService {
    usuarioRepository;
    usuariosService;
    constructor(usuarioRepository, usuariosService) {
        this.usuarioRepository = usuarioRepository;
        this.usuariosService = usuariosService;
    }
    sanitize(u) {
        if (!u)
            return u;
        const { contrasenia, ...rest } = u;
        return rest;
    }
    async create(data) {
        const usuario = new usuario_entity_1.Usuario();
        usuario.correo = data.correo;
        usuario.usuario = data.usuario;
        usuario.contrasenia = await (0, utils_1.hashPassword)(data.contrasenia);
        usuario.idRol = data.idRol;
        const usuarioSaved = await this.usuarioRepository.save(usuario);
        return usuarioSaved;
    }
    async createTemporal(data, manager) {
        const repo = manager ? manager.getRepository(usuario_entity_1.Usuario) : this.usuarioRepository;
        const usuario = new usuario_entity_1.Usuario();
        usuario.usuario = data.usuario;
        usuario.correo = data.correo;
        usuario.contrasenia = await (0, utils_1.hashPassword)(data.contrasenia);
        usuario.idRol = roles_const_1.RolesEnum.TEMPORAL;
        usuario.expiracion = data.expiracion;
        const usuarioSaved = await repo.save(usuario);
        return usuarioSaved;
    }
    async update(id, data) {
        const entity = await this.usuariosService.findOne(id, {
            throwException: true,
        });
        if (data.usuario && data.usuario !== entity.usuario) {
            const repeated = await this.usuariosService.findByUsuario(data.usuario, {
                throwException: false,
            });
            if (repeated && repeated.id !== id) {
                throw new common_1.ConflictException({
                    message: 'El nombre de usuario ya está en uso.',
                });
            }
            entity.usuario = data.usuario;
        }
        if (data.contrasenia) {
            entity.contrasenia = await (0, utils_1.hashPassword)(data.contrasenia);
        }
        if (data.correo && data.correo !== entity.correo) {
            const repeatedEmail = await this.usuariosService.findOneByCorreo(data.correo, {
                throwException: false,
            });
            if (repeatedEmail && repeatedEmail.id !== id) {
                throw new common_1.ConflictException({
                    message: 'El correo ya está en uso.',
                });
            }
            entity.correo = data.correo;
        }
        if (data.idRol !== undefined && data.idRol !== entity.idRol) {
            entity.idRol = data.idRol;
        }
        const updated = await this.usuarioRepository.save(entity);
        return this.sanitize(updated);
    }
    async remove(id) {
        const exists = await this.usuariosService.findOne(id, {
            throwException: true
        });
        await this.usuarioRepository.delete(id);
        return true;
    }
};
exports.UsuariosAuthService = UsuariosAuthService;
exports.UsuariosAuthService = UsuariosAuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(usuario_entity_1.Usuario)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        usuarios_service_1.UsuariosService])
], UsuariosAuthService);
//# sourceMappingURL=usuarios-auth.service.js.map