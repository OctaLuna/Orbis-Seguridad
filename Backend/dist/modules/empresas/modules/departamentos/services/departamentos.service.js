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
exports.DepartamentosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const departamento_entity_1 = require("../entities/departamento.entity");
const typeorm_2 = require("typeorm");
let DepartamentosService = class DepartamentosService {
    departamentoRepository;
    constructor(departamentoRepository) {
        this.departamentoRepository = departamentoRepository;
    }
    create(createDepartamentoDto) {
        return 'This action adds a new departamento';
    }
    async findAll() {
        const departamentos = await this.departamentoRepository.find({
            select: {
                id: true,
                nombre: true
            }
        });
        return departamentos;
    }
    async findManyByIds(ids) {
        const departamentos = await this.departamentoRepository.find({
            where: {
                id: (0, typeorm_2.In)(ids)
            }
        });
        const encontradosIds = departamentos.map(dep => dep.id);
        const idsNoEncontrados = ids.filter(id => !encontradosIds.includes(id));
        if (idsNoEncontrados.length > 0) {
            throw new common_1.NotFoundException({
                message: 'Algunos IDs de departamentos no se encontraron',
            });
        }
        return departamentos;
    }
    async findOne(id, options = {}) {
        if (Number.isNaN(id) || id === 0) {
            throw new common_1.BadRequestException({
                message: 'Id de tamanio de empresa invalido'
            });
        }
        const dep = await this.departamentoRepository.findOne({
            where: {
                id: id
            }
        });
        if (!dep && options.throwException) {
            throw new common_1.NotFoundException({
                message: 'No se encontro el tamanio de la empresa'
            });
        }
        return dep;
    }
    update(id, updateDepartamentoDto) {
        return `This action updates a #${id} departamento`;
    }
    remove(id) {
        return `This action removes a #${id} departamento`;
    }
};
exports.DepartamentosService = DepartamentosService;
exports.DepartamentosService = DepartamentosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(departamento_entity_1.Departamento)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DepartamentosService);
//# sourceMappingURL=departamentos.service.js.map