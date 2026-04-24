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
exports.AccionesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const accion_entity_1 = require("../entities/accion.entity");
const typeorm_2 = require("typeorm");
let AccionesService = class AccionesService {
    accionRepository;
    constructor(accionRepository) {
        this.accionRepository = accionRepository;
    }
    create(createAccioneDto) {
        return 'This action adds a new accione';
    }
    async findManyByIds(ids) {
        const acciones = await this.accionRepository.find({
            where: {
                id: (0, typeorm_2.In)(ids)
            }
        });
        const foundIds = acciones.map(a => a.id);
        const notFoundIds = ids.filter(id => !foundIds.includes(id));
        if (notFoundIds.length > 0) {
            throw new common_1.NotFoundException({
                message: `No se encontraron los siguientes ids: ${notFoundIds.join(', ')}`
            });
        }
        return acciones;
    }
    findAll() {
        return `This action returns all acciones`;
    }
    findOne(id) {
        return `This action returns a #${id} accione`;
    }
    update(id, updateAccioneDto) {
        return `This action updates a #${id} accione`;
    }
    remove(id) {
        return `This action removes a #${id} accione`;
    }
};
exports.AccionesService = AccionesService;
exports.AccionesService = AccionesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(accion_entity_1.Accion)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AccionesService);
//# sourceMappingURL=acciones.service.js.map