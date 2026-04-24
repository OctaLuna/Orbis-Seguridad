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
exports.EmpresasTiposSocietariosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const empresa_tipo_societario_entity_1 = require("../entities/empresa-tipo-societario.entity");
const typeorm_2 = require("typeorm");
const tipos_societarios_service_1 = require("../../../services/tipos-societarios.service");
let EmpresasTiposSocietariosService = class EmpresasTiposSocietariosService {
    empresaTipoSocietario;
    tiposSocietariosService;
    constructor(empresaTipoSocietario, tiposSocietariosService) {
        this.empresaTipoSocietario = empresaTipoSocietario;
        this.tiposSocietariosService = tiposSocietariosService;
    }
    create(createEmpresasTiposSocietarioDto) {
        return 'This action adds a new empresasTiposSocietario';
    }
    async createTransaction(manager, data) {
        if (data.data && Array.isArray(data.data) && data.data.length > 0) {
            await this.tiposSocietariosService.findManyByIds(data.data.map(d => d.idTipoSocietario));
        }
        const tipoSocOtros = (data.otros && Array.isArray(data.otros) && data.otros.length > 0)
            ? await this.tiposSocietariosService.createTransaccion(manager, data.otros)
            : [];
        const tiposSocParaGuardar = [];
        if (data.data) {
            for (const d of data.data) {
                tiposSocParaGuardar.push({
                    idEmpresa: data.idEmpresa,
                    idTipsoc: d.idTipoSocietario,
                    esActivo: d.esActivo,
                    fechaCambio: d.fechaCambio || undefined
                });
            }
        }
        for (const o of tipoSocOtros) {
            tiposSocParaGuardar.push({
                idEmpresa: data.idEmpresa,
                ...o
            });
        }
        if (tiposSocParaGuardar.length > 0) {
            return await manager.getRepository(empresa_tipo_societario_entity_1.EmpresaTipoSocietario).save(tiposSocParaGuardar);
        }
        return [];
    }
    findAll() {
        return `This action returns all empresasTiposSocietarios`;
    }
    findOne(id) {
        return `This action returns a #${id} empresasTiposSocietario`;
    }
    update(id, updateEmpresasTiposSocietarioDto) {
        return `This action updates a #${id} empresasTiposSocietario`;
    }
    remove(id) {
        return `This action removes a #${id} empresasTiposSocietario`;
    }
};
exports.EmpresasTiposSocietariosService = EmpresasTiposSocietariosService;
exports.EmpresasTiposSocietariosService = EmpresasTiposSocietariosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(empresa_tipo_societario_entity_1.EmpresaTipoSocietario)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        tipos_societarios_service_1.TiposSocietariosService])
], EmpresasTiposSocietariosService);
//# sourceMappingURL=empresas-tipos-societarios.service.js.map