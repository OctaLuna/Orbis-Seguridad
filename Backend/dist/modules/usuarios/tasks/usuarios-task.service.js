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
exports.UsuariosTaskService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const usuario_entity_1 = require("../entities/usuario.entity");
const typeorm_2 = require("typeorm");
const schedule_1 = require("@nestjs/schedule");
const roles_const_1 = require("../../../shared/constants/roles.const");
let UsuariosTaskService = class UsuariosTaskService {
    usuarioRepository;
    constructor(usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }
    async eliminarUsuarioExpirados() {
        const usuarios = await this.usuarioRepository.find({
            where: {
                idRol: roles_const_1.RolesEnum.TEMPORAL,
                expiracion: (0, typeorm_2.LessThanOrEqual)(new Date())
            }
        });
        if (usuarios && usuarios.length > 0) {
            await this.usuarioRepository.remove(usuarios);
        }
    }
};
exports.UsuariosTaskService = UsuariosTaskService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_3AM, {
        name: 'eliminar-expirados',
        timeZone: 'America/La_Paz'
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsuariosTaskService.prototype, "eliminarUsuarioExpirados", null);
exports.UsuariosTaskService = UsuariosTaskService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(usuario_entity_1.Usuario)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsuariosTaskService);
//# sourceMappingURL=usuarios-task.service.js.map