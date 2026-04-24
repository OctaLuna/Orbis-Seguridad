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
exports.FundadoresService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const fundador_entity_1 = require("../entities/fundador.entity");
const typeorm_2 = require("typeorm");
let FundadoresService = class FundadoresService {
    fundadorRepository;
    constructor(fundadorRepository) {
        this.fundadorRepository = fundadorRepository;
    }
    async createTransaction(maneger, data) {
        let fundadores = data.fundadores.map((fundador) => ({
            idEmpresa: data.idEmpresa,
            nombre: fundador
        }));
        const repo = await maneger.getRepository(fundador_entity_1.Fundador);
        const newFundadores = await repo.save(fundadores);
        return newFundadores;
    }
    findAll() {
        return `This action returns all fundadores`;
    }
    findOne(id) {
        return `This action returns a #${id} fundadore`;
    }
    update(id, updateFundadoreDto) {
        return `This action updates a #${id} fundadore`;
    }
    remove(id) {
        return `This action removes a #${id} fundadore`;
    }
};
exports.FundadoresService = FundadoresService;
exports.FundadoresService = FundadoresService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(fundador_entity_1.Fundador)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], FundadoresService);
//# sourceMappingURL=fundadores.service.js.map