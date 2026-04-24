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
exports.OperacionesInternacionalesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const operacion_internacional_entity_1 = require("../entities/operacion-internacional.entity");
const typeorm_2 = require("typeorm");
const paises_service_1 = require("../../paises/services/paises.service");
let OperacionesInternacionalesService = class OperacionesInternacionalesService {
    operacionInternacionalRepository;
    paisesService;
    constructor(operacionInternacionalRepository, paisesService) {
        this.operacionInternacionalRepository = operacionInternacionalRepository;
        this.paisesService = paisesService;
    }
    create(createOperacionesInternacionaleDto) {
        return 'This action adds a new operacionesInternacionale';
    }
    async createTransaction(manager, data) {
        await this.paisesService.findManyByIds(data.paisesOperaInternacionalmente);
        const paisesOperaInternacionalente = data.paisesOperaInternacionalmente.map(p => ({
            idEmpresa: data.idEmpresa,
            idPais: p
        }));
        return await manager.getRepository(operacion_internacional_entity_1.OperacionInternacional).save(paisesOperaInternacionalente);
    }
    findAll() {
        return `This action returns all operacionesInternacionales`;
    }
    findOne(id) {
        return `This action returns a #${id} operacionesInternacionale`;
    }
    update(id, updateOperacionesInternacionaleDto) {
        return `This action updates a #${id} operacionesInternacionale`;
    }
    remove(id) {
        return `This action removes a #${id} operacionesInternacionale`;
    }
};
exports.OperacionesInternacionalesService = OperacionesInternacionalesService;
exports.OperacionesInternacionalesService = OperacionesInternacionalesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(operacion_internacional_entity_1.OperacionInternacional)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        paises_service_1.PaisesService])
], OperacionesInternacionalesService);
//# sourceMappingURL=operaciones-internacionales.service.js.map