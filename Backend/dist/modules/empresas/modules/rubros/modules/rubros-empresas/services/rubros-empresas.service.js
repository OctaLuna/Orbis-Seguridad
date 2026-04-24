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
exports.RubrosEmpresasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const rubro_empresa_entity_1 = require("../entities/rubro-empresa.entity");
const typeorm_2 = require("typeorm");
const rubros_service_1 = require("../../../services/rubros.service");
let RubrosEmpresasService = class RubrosEmpresasService {
    rubroEmpresaRepository;
    rubrosService;
    constructor(rubroEmpresaRepository, rubrosService) {
        this.rubroEmpresaRepository = rubroEmpresaRepository;
        this.rubrosService = rubrosService;
    }
    create(createRubrosEmpresaDto) {
        return 'This action adds a new rubrosEmpresa';
    }
    async createTransaction(manager, data) {
        if (data.data && data.data.length > 0) {
            await this.rubrosService.findManyByIds(data.data.map(d => d.idRubro));
        }
        const rubrosOtro = (data.otros && data.otros.length > 0)
            ? await this.rubrosService.createTransaccion(manager, data.otros)
            : [];
        let rubrosEmpresa = [];
        data.data?.map(d => {
            rubrosEmpresa.push({
                idEmpresa: data.idEmpresa,
                idRubro: d.idRubro,
                esActivo: d.esActivo
            });
        });
        rubrosOtro.map(o => {
            rubrosEmpresa.push({
                idEmpresa: data.idEmpresa,
                idRubro: o.idRubro,
                esActivo: o.esActivo
            });
        });
        if (rubrosEmpresa.length > 0) {
            return await manager.getRepository(rubro_empresa_entity_1.RubroEmpresa).save(rubrosEmpresa);
        }
        return [];
    }
    findAll() {
        return `This action returns all rubrosEmpresas`;
    }
    findOne(id) {
        return `This action returns a #${id} rubrosEmpresa`;
    }
    update(id, updateRubrosEmpresaDto) {
        return `This action updates a #${id} rubrosEmpresa`;
    }
    remove(id) {
        return `This action removes a #${id} rubrosEmpresa`;
    }
};
exports.RubrosEmpresasService = RubrosEmpresasService;
exports.RubrosEmpresasService = RubrosEmpresasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(rubro_empresa_entity_1.RubroEmpresa)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        rubros_service_1.RubrosService])
], RubrosEmpresasService);
//# sourceMappingURL=rubros-empresas.service.js.map