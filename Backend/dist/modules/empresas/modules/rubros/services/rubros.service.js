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
exports.RubrosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const rubro_entity_1 = require("../entities/rubro.entity");
const typeorm_2 = require("typeorm");
let RubrosService = class RubrosService {
    rubroRepository;
    constructor(rubroRepository) {
        this.rubroRepository = rubroRepository;
    }
    create(createRubroDto) {
        return 'This action adds a new rubro';
    }
    async createTransaccion(manager, data) {
        const rubros = data.map((rubro) => ({
            nombre: rubro.nombre,
            esPropio: true
        }));
        const result = await manager.getRepository(rubro_entity_1.Rubro).save(rubros);
        return result.map((r) => ({
            idRubro: r.id,
            esActivo: data.find(ru => ru.nombre === r.nombre).esActivo
        }));
    }
    async findManyByIds(ids) {
        const rubros = await this.rubroRepository.find({
            where: {
                id: (0, typeorm_2.In)(ids)
            }
        });
        const foundIds = rubros.map(r => r.id);
        const missingId = ids.find(id => !foundIds.includes(id));
        if (missingId !== undefined) {
            throw new common_1.NotFoundException(`El rubro con id ${missingId} no fue encontrado`);
        }
        return rubros;
    }
    async findAll() {
        const rubros = await this.rubroRepository.find({
            where: {
                esPropio: false
            },
            select: {
                id: true,
                nombre: true
            }
        });
        return rubros;
    }
    findOne(id) {
        return `This action returns a #${id} rubro`;
    }
    update(id, updateRubroDto) {
        return `This action updates a #${id} rubro`;
    }
    remove(id) {
        return `This action removes a #${id} rubro`;
    }
};
exports.RubrosService = RubrosService;
exports.RubrosService = RubrosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(rubro_entity_1.Rubro)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RubrosService);
//# sourceMappingURL=rubros.service.js.map