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
const email_service_1 = require("../../../shared/services/email/email.service");
const alias_generator_util_1 = require("../../../common/utils/alias-generator.util");
const date_fns_1 = require("date-fns");
const investigador_rubro_entity_1 = require("../entities/investigador-rubro.entity");
let UsuariosAuthService = class UsuariosAuthService {
    usuarioRepository;
    investigadorRubroRepository;
    usuariosService;
    emailService;
    constructor(usuarioRepository, investigadorRubroRepository, usuariosService, emailService) {
        this.usuarioRepository = usuarioRepository;
        this.investigadorRubroRepository = investigadorRubroRepository;
        this.usuariosService = usuariosService;
        this.emailService = emailService;
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
        const entity = await this.usuariosService.findOne(id, { throwException: true });
        if (data.usuario && data.usuario !== entity.usuario) {
            const repeated = await this.usuariosService.findByUsuario(data.usuario, { throwException: false });
            if (repeated && repeated.id !== id) {
                throw new common_1.ConflictException({ message: 'El nombre de usuario ya está en uso.' });
            }
            entity.usuario = data.usuario;
        }
        if (data.contrasenia) {
            entity.contrasenia = await (0, utils_1.hashPassword)(data.contrasenia);
        }
        if (data.correo && data.correo !== entity.correo) {
            const repeatedEmail = await this.usuariosService.findOneByCorreo(data.correo, { throwException: false });
            if (repeatedEmail && repeatedEmail.id !== id) {
                throw new common_1.ConflictException({ message: 'El correo ya está en uso.' });
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
        await this.usuariosService.findOne(id, { throwException: true });
        await this.usuarioRepository.delete(id);
        return true;
    }
    async crearUsuario(dto, creadorIdRol) {
        const alias = await this.generarAliasUnico(dto.nombre, dto.apellidoPaterno);
        const tempPassword = this.generarPasswordTemporal();
        const hash = await (0, utils_1.hashPassword)(tempPassword);
        let idRol;
        if (dto.tipoRol === 'admin') {
            idRol = this.calcularRolAdmin(dto.permisos?.panelUsuarios ?? false, dto.permisos?.editarEmpresas ?? false, dto.permisos?.formularioExterno ?? false, creadorIdRol === 1);
        }
        else {
            const esJunior = dto.rubrosAsignados && dto.rubrosAsignados.length > 0;
            idRol = esJunior ? 5 : 4;
        }
        const apellido = dto.apellidoMaterno
            ? `${dto.apellidoPaterno} ${dto.apellidoMaterno}`
            : dto.apellidoPaterno;
        const nuevoUsuario = this.usuarioRepository.create({
            nombre: dto.nombre,
            apellido: apellido,
            usuario: alias,
            correo: `${alias}@orbis.com`,
            correoReal: dto.correoReal,
            contrasenia: hash,
            idRol: idRol,
            mustChangePassword: true,
            passwordExpiresAt: (0, date_fns_1.addDays)(new Date(), 60),
            accesoFormularioExterno: dto.permisos?.formularioExterno ?? false,
        });
        const guardado = await this.usuarioRepository.save(nuevoUsuario);
        if (idRol === 5 && dto.rubrosAsignados && dto.rubrosAsignados.length > 0) {
            const asignaciones = dto.rubrosAsignados.map((idRubro) => ({
                idUsuario: guardado.id,
                idRubro,
            }));
            await this.investigadorRubroRepository.save(asignaciones);
        }
        if (dto.permisos?.formularioExterno) {
            await this.emailService.enviarAccesoFormularioExterno(dto.correoReal, alias, tempPassword, 'https://orbis-empresarial.vercel.app/');
        }
        else {
            await this.emailService.enviarPasswordTemporal(dto.correoReal, alias, tempPassword);
        }
        const { contrasenia, ...resultado } = guardado;
        return resultado;
    }
    calcularRolAdmin(permisoUsuarios, permisoEmpresas, permisoFormularioExterno, creadorEsSuperadmin) {
        if (permisoUsuarios && permisoEmpresas) {
            if (!creadorEsSuperadmin) {
                throw new common_1.ForbiddenException('Solo un SUPERADMIN puede crear usuarios con acceso total al sistema');
            }
            return 1;
        }
        if (permisoUsuarios)
            return 2;
        if (permisoEmpresas)
            return 3;
        if (permisoFormularioExterno)
            return 3;
        throw new common_1.BadRequestException('Un administrador debe tener al menos un acceso asignado');
    }
    async generarAliasUnico(nombre, apellidoPaterno) {
        const base = (0, alias_generator_util_1.buildBaseAlias)(nombre, apellidoPaterno);
        let alias = base;
        let contador = 2;
        while (await this.usuarioRepository.existsBy({ usuario: alias })) {
            alias = `${base}${contador}`;
            contador++;
        }
        return alias;
    }
    generarPasswordTemporal() {
        const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789!@#$%&';
        let pwd = '';
        pwd += 'ABCDEFGHJKLMNPQRSTUVWXYZ'[Math.floor(Math.random() * 24)];
        pwd += 'abcdefghjkmnpqrstuvwxyz'[Math.floor(Math.random() * 23)];
        pwd += '23456789'[Math.floor(Math.random() * 8)];
        pwd += '!@#$%&'[Math.floor(Math.random() * 6)];
        for (let i = pwd.length; i < 16; i++) {
            pwd += chars[Math.floor(Math.random() * chars.length)];
        }
        return pwd.split('').sort(() => Math.random() - 0.5).join('');
    }
};
exports.UsuariosAuthService = UsuariosAuthService;
exports.UsuariosAuthService = UsuariosAuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(usuario_entity_1.Usuario)),
    __param(1, (0, typeorm_1.InjectRepository)(investigador_rubro_entity_1.InvestigadorRubro)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        usuarios_service_1.UsuariosService,
        email_service_1.EmailService])
], UsuariosAuthService);
//# sourceMappingURL=usuarios-auth.service.js.map