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
exports.TiposAccionesImplementacionesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const tipo_accion_implementacion_entity_1 = require("../entities/tipo-accion-implementacion.entity");
const typeorm_2 = require("typeorm");
const tipos_acciones_service_1 = require("../../../services/tipos-acciones.service");
let TiposAccionesImplementacionesService = class TiposAccionesImplementacionesService {
    tipoAccionImplementacionRepository;
    tiposAccionesService;
    constructor(tipoAccionImplementacionRepository, tiposAccionesService) {
        this.tipoAccionImplementacionRepository = tipoAccionImplementacionRepository;
        this.tiposAccionesService = tiposAccionesService;
    }
    create(createTiposAccionesImplementacioneDto) {
        return 'This action adds a new tiposAccionesImplementacione';
    }
    async createTransaction(manager, data) {
        if (!data.tiposAcciones || data.tiposAcciones.length === 0) {
            return [];
        }
        const tiposAccionesImplementaciones = data.tiposAcciones.map(t => ({
            idImplementacion: data.idImplementacion,
            idTipoAccion: t
        }));
        return await manager.getRepository(tipo_accion_implementacion_entity_1.TipoAccionImplementacion).save(tiposAccionesImplementaciones);
    }
    findAll() {
        return `This action returns all tiposAccionesImplementaciones`;
    }
    findOne(id) {
        return `This action returns a #${id} tiposAccionesImplementacione`;
    }
    update(id, updateTiposAccionesImplementacioneDto) {
        return `This action updates a #${id} tiposAccionesImplementacione`;
    }
    remove(id) {
        return `This action removes a #${id} tiposAccionesImplementacione`;
    }
};
exports.TiposAccionesImplementacionesService = TiposAccionesImplementacionesService;
exports.TiposAccionesImplementacionesService = TiposAccionesImplementacionesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tipo_accion_implementacion_entity_1.TipoAccionImplementacion)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        tipos_acciones_service_1.TiposAccionesService])
], TiposAccionesImplementacionesService);
//# sourceMappingURL=tipos-acciones-implementaciones.service.js.map