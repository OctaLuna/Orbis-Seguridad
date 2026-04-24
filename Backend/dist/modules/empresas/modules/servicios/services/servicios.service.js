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
exports.ServiciosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const servicio_entity_1 = require("../entities/servicio.entity");
const typeorm_2 = require("typeorm");
let ServiciosService = class ServiciosService {
    servicioRepository;
    constructor(servicioRepository) {
        this.servicioRepository = servicioRepository;
    }
    create(createServicioDto) {
        return 'This action adds a new servicio';
    }
    async createTransaction(manger, data) {
        const repo = manger.getRepository(servicio_entity_1.Servicio);
        const servicios = data.servicio.map((servicio) => ({
            idEmpresa: data.idEmpresa,
            nombre: servicio
        }));
        return await repo.save(servicios);
    }
    findAll() {
        return `This action returns all servicios`;
    }
    findOne(id) {
        return `This action returns a #${id} servicio`;
    }
    update(id, updateServicioDto) {
        return `This action updates a #${id} servicio`;
    }
    remove(id) {
        return `This action removes a #${id} servicio`;
    }
};
exports.ServiciosService = ServiciosService;
exports.ServiciosService = ServiciosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(servicio_entity_1.Servicio)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ServiciosService);
//# sourceMappingURL=servicios.service.js.map