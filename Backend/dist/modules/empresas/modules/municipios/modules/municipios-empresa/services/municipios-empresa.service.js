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
exports.MunicipiosEmpresaService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const municipio_empresa_entity_1 = require("../entities/municipio-empresa.entity");
const typeorm_2 = require("typeorm");
const municipios_service_1 = require("../../../services/municipios.service");
let MunicipiosEmpresaService = class MunicipiosEmpresaService {
    municipioEmpresaRepository;
    municipiosService;
    constructor(municipioEmpresaRepository, municipiosService) {
        this.municipioEmpresaRepository = municipioEmpresaRepository;
        this.municipiosService = municipiosService;
    }
    create(createMunicipiosEmpresaDto) {
        return 'This action adds a new municipiosEmpresa';
    }
    async createTransaction(manager, data) {
        await this.municipiosService.findManybyIds(data.municipios);
        const muncipios = data.municipios.map(m => ({
            idEmpresa: data.idEmpresa,
            idMunicipio: m
        }));
        return await manager.getRepository(municipio_empresa_entity_1.MunicipioEmpresa).save(muncipios);
    }
    findAll() {
        return `This action returns all municipiosEmpresa`;
    }
    findOne(id) {
        return `This action returns a #${id} municipiosEmpresa`;
    }
    update(id, updateMunicipiosEmpresaDto) {
        return `This action updates a #${id} municipiosEmpresa`;
    }
    remove(id) {
        return `This action removes a #${id} municipiosEmpresa`;
    }
};
exports.MunicipiosEmpresaService = MunicipiosEmpresaService;
exports.MunicipiosEmpresaService = MunicipiosEmpresaService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(municipio_empresa_entity_1.MunicipioEmpresa)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        municipios_service_1.MunicipiosService])
], MunicipiosEmpresaService);
//# sourceMappingURL=municipios-empresa.service.js.map