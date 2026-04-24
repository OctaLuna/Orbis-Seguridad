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
exports.MunicipioEmpresa = void 0;
const empresa_entity_1 = require("../../../../../entities/empresa.entity");
const typeorm_1 = require("typeorm");
const municipio_entity_1 = require("../../../entities/municipio.entity");
let MunicipioEmpresa = class MunicipioEmpresa {
    id;
    idEmpresa;
    idMunicipio;
    empresa;
    municipio;
};
exports.MunicipioEmpresa = MunicipioEmpresa;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_municipio_empresa' }),
    __metadata("design:type", Number)
], MunicipioEmpresa.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'id_empresa' }),
    __metadata("design:type", Number)
], MunicipioEmpresa.prototype, "idEmpresa", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'id_municipio' }),
    __metadata("design:type", Number)
], MunicipioEmpresa.prototype, "idMunicipio", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => empresa_entity_1.Empresa, (empresa) => empresa.municipiosEmpresas),
    (0, typeorm_1.JoinColumn)({ name: 'id_empresa' }),
    __metadata("design:type", empresa_entity_1.Empresa)
], MunicipioEmpresa.prototype, "empresa", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => municipio_entity_1.Municipio, (municipio) => municipio.municipiosEmpresas),
    (0, typeorm_1.JoinColumn)({ name: 'id_municipio' }),
    __metadata("design:type", municipio_entity_1.Municipio)
], MunicipioEmpresa.prototype, "municipio", void 0);
exports.MunicipioEmpresa = MunicipioEmpresa = __decorate([
    (0, typeorm_1.Entity)('municipios_empresas')
], MunicipioEmpresa);
//# sourceMappingURL=municipio-empresa.entity.js.map