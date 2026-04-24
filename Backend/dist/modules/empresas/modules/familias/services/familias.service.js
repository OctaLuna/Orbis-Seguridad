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
exports.FamiliasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const familia_entity_1 = require("../entities/familia.entity");
const typeorm_2 = require("typeorm");
let FamiliasService = class FamiliasService {
    familiaRepository;
    constructor(familiaRepository) {
        this.familiaRepository = familiaRepository;
    }
    create(createFamiliaDto) {
        return 'This action adds a new familia';
    }
    async createTransaction(manager, data) {
        const familia = new familia_entity_1.Familia();
        familia.idEmpresa = data.idEmpresa;
        familia.esFamiliar = data.esFamiliar;
        familia.anio = data.anio;
        return await manager.getRepository(familia_entity_1.Familia).save(familia);
    }
    findAll() {
        return `This action returns all familias`;
    }
    findOne(id) {
        return `This action returns a #${id} familia`;
    }
    update(id, updateFamiliaDto) {
        return `This action updates a #${id} familia`;
    }
    remove(id) {
        return `This action removes a #${id} familia`;
    }
};
exports.FamiliasService = FamiliasService;
exports.FamiliasService = FamiliasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(familia_entity_1.Familia)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FamiliasService);
//# sourceMappingURL=familias.service.js.map