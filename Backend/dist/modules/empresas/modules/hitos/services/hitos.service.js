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
exports.HitosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const hito_entity_1 = require("../entities/hito.entity");
const typeorm_2 = require("typeorm");
let HitosService = class HitosService {
    hitoRepository;
    constructor(hitoRepository) {
        this.hitoRepository = hitoRepository;
    }
    create(createHitoDto) {
        return 'This action adds a new hito';
    }
    async createTransaction(manager, data) {
        const hitos = data.hitos.map(h => ({
            idEmpresa: data.idEmpresa,
            ...h
        }));
        return await manager.getRepository(hito_entity_1.Hito).save(hitos);
    }
    findAll() {
        return `This action returns all hitos`;
    }
    findOne(id) {
        return `This action returns a #${id} hito`;
    }
    update(id, updateHitoDto) {
        return `This action updates a #${id} hito`;
    }
    remove(id) {
        return `This action removes a #${id} hito`;
    }
};
exports.HitosService = HitosService;
exports.HitosService = HitosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(hito_entity_1.Hito)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], HitosService);
//# sourceMappingURL=hitos.service.js.map