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
exports.PasswordHistoryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const password_history_entity_1 = require("../entities/password-history.entity");
const HISTORIAL_MAX = 10;
let PasswordHistoryService = class PasswordHistoryService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async verificarReutilizacion(idUsuario, passwordPlano) {
        const historial = await this.repo.find({
            where: { idUsuario },
            order: { createdAt: 'DESC' },
            take: HISTORIAL_MAX,
        });
        for (const entrada of historial) {
            const reutilizada = await bcrypt.compare(passwordPlano, entrada.passwordHash);
            if (reutilizada) {
                throw new common_1.BadRequestException(`No puedes usar una contraseña que ya utilizaste en los últimos ${HISTORIAL_MAX} cambios`);
            }
        }
    }
    async guardarEnHistorial(idUsuario, hashNuevo) {
        await this.repo.save({ idUsuario, passwordHash: hashNuevo });
        const todas = await this.repo.find({
            where: { idUsuario },
            order: { createdAt: 'DESC' },
        });
        if (todas.length > HISTORIAL_MAX) {
            const aEliminar = todas.slice(HISTORIAL_MAX).map((h) => h.id);
            await this.repo.delete(aEliminar);
        }
    }
    async obtenerRegistroFechas(idUsuario) {
        const historial = await this.repo.find({
            where: { idUsuario },
            order: { createdAt: 'DESC' },
            select: ['createdAt'],
        });
        return historial.map((h) => ({ fecha: h.createdAt }));
    }
};
exports.PasswordHistoryService = PasswordHistoryService;
exports.PasswordHistoryService = PasswordHistoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(password_history_entity_1.PasswordHistory)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PasswordHistoryService);
//# sourceMappingURL=password-history.service.js.map