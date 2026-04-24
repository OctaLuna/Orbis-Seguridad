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
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmpresaTipoSocietario = void 0;
const empresa_entity_1 = require("../../../../../entities/empresa.entity");
const typeorm_1 = require("typeorm");
const tipo_societario_entity_1 = require("../../../entities/tipo-societario.entity");
let EmpresaTipoSocietario = class EmpresaTipoSocietario {
    id;
    idEmpresa;
    idTipsoc;
    esActivo;
    fechaCambio;
    empresa;
    tipoSocietario;
};
exports.EmpresaTipoSocietario = EmpresaTipoSocietario;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_empresas_tipos_societarios' }),
    __metadata("design:type", Number)
], EmpresaTipoSocietario.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'id_empresa' }),
    __metadata("design:type", Number)
], EmpresaTipoSocietario.prototype, "idEmpresa", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'id_tipsoc' }),
    __metadata("design:type", Number)
], EmpresaTipoSocietario.prototype, "idTipsoc", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'es_activo', type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], EmpresaTipoSocietario.prototype, "esActivo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_cambio', type: 'date' }),
    __metadata("design:type", String)
], EmpresaTipoSocietario.prototype, "fechaCambio", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => empresa_entity_1.Empresa, (empresa) => empresa.tiposSocietariosEmpresa),
    (0, typeorm_1.JoinColumn)({ name: 'id_empresa' }),
    __metadata("design:type", empresa_entity_1.Empresa)
], EmpresaTipoSocietario.prototype, "empresa", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tipo_societario_entity_1.TipoSocietario, (tipoSocietario) => tipoSocietario.tiposSocietariosEmpresa),
    (0, typeorm_1.JoinColumn)({ name: 'id_tipsoc' }),
    __metadata("design:type", tipo_societario_entity_1.TipoSocietario)
], EmpresaTipoSocietario.prototype, "tipoSocietario", void 0);
exports.EmpresaTipoSocietario = EmpresaTipoSocietario = __decorate([
    (0, typeorm_1.Entity)('empresas_tipos_societarios')
], EmpresaTipoSocietario);
//# sourceMappingURL=empresa-tipo-societario.entity.js.map