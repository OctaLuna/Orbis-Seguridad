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
exports.ImplementacionesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const implementacion_entity_1 = require("../entities/implementacion.entity");
const typeorm_2 = require("typeorm");
const tipos_acciones_implementaciones_service_1 = require("../modules/tipos-acciones/modules/tipos-acciones-implementaciones/services/tipos-acciones-implementaciones.service");
const implementaciones_acciones_service_1 = require("../modules/acciones/modules/implementaciones-acciones/services/implementaciones-acciones.service");
let ImplementacionesService = class ImplementacionesService {
    implementacionRepository;
    tiposAccionesImplementacionesService;
    implementacionesAccionesService;
    constructor(implementacionRepository, tiposAccionesImplementacionesService, implementacionesAccionesService) {
        this.implementacionRepository = implementacionRepository;
        this.tiposAccionesImplementacionesService = tiposAccionesImplementacionesService;
        this.implementacionesAccionesService = implementacionesAccionesService;
    }
    create(data) {
        return 'This action adds a new implementacione';
    }
    async createTransaction(manager, data) {
        const implementacion = new implementacion_entity_1.Implementacion();
        implementacion.anio = data.anio || new Date().getFullYear();
        implementacion.idEmpresa = data.idEmpresa;
        const implementacionSaved = await manager.getRepository(implementacion_entity_1.Implementacion).save(implementacion);
        if (data.tiposAccion && data.tiposAccion.length > 0) {
            await this.tiposAccionesImplementacionesService.createTransaction(manager, {
                idImplementacion: implementacionSaved.id,
                tiposAcciones: data.tiposAccion
            });
        }
        if (data.acciones && data.acciones.length > 0) {
            await this.implementacionesAccionesService.createTransaction(manager, {
                idImplementacion: implementacionSaved.id,
                acciones: data.acciones
            });
        }
        return implementacionSaved;
    }
    findAll() {
        return `This action returns all implementaciones`;
    }
    findOne(id) {
        return `This action returns a #${id} implementacione`;
    }
    update(id, updateImplementacioneDto) {
        return `This action updates a #${id} implementacione`;
    }
    remove(id) {
        return `This action removes a #${id} implementacione`;
    }
};
exports.ImplementacionesService = ImplementacionesService;
exports.ImplementacionesService = ImplementacionesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(implementacion_entity_1.Implementacion)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        tipos_acciones_implementaciones_service_1.TiposAccionesImplementacionesService,
        implementaciones_acciones_service_1.ImplementacionesAccionesService])
], ImplementacionesService);
//# sourceMappingURL=implementaciones.service.js.map