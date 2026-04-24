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
exports.ImplementacionesAccionesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const implementacion_accion_entity_1 = require("../entities/implementacion-accion.entity");
const typeorm_2 = require("typeorm");
const acciones_service_1 = require("../../../services/acciones.service");
const proyectos_service_1 = require("../../proyectos/services/proyectos.service");
let ImplementacionesAccionesService = class ImplementacionesAccionesService {
    implementacionAccionRepository;
    accionesService;
    proyectosService;
    constructor(implementacionAccionRepository, accionesService, proyectosService) {
        this.implementacionAccionRepository = implementacionAccionRepository;
        this.accionesService = accionesService;
        this.proyectosService = proyectosService;
    }
    create(createImplementacionesAccioneDto) {
        return 'This action adds a new implementacionesAccione';
    }
    async createTransaction(manager, data) {
        await this.accionesService.findManyByIds(data.acciones.map(a => a.id));
        const accionesSaved = [];
        for (const accion of data.acciones) {
            const implementacionAccionSaved = await this.saveImplementacionAccion(manager, data, accion);
            await this.proyectosService.createTransaction(manager, {
                idImplementacionAccion: implementacionAccionSaved.id,
                proyectos: accion.proyectos
            });
            accionesSaved.push(implementacionAccionSaved);
        }
        return accionesSaved;
    }
    async saveImplementacionAccion(manager, data, accion) {
        return manager.getRepository(implementacion_accion_entity_1.ImplementacionAccion).save({
            idImplementacion: data.idImplementacion,
            idAccion: accion.id
        });
    }
    findAll() {
        return `This action returns all implementacionesAcciones`;
    }
    findOne(id) {
        return `This action returns a #${id} implementacionesAccione`;
    }
    update(id, updateImplementacionesAccioneDto) {
        return `This action updates a #${id} implementacionesAccione`;
    }
    remove(id) {
        return `This action removes a #${id} implementacionesAccione`;
    }
};
exports.ImplementacionesAccionesService = ImplementacionesAccionesService;
exports.ImplementacionesAccionesService = ImplementacionesAccionesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(implementacion_accion_entity_1.ImplementacionAccion)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        acciones_service_1.AccionesService,
        proyectos_service_1.ProyectosService])
], ImplementacionesAccionesService);
//# sourceMappingURL=implementaciones-acciones.service.js.map