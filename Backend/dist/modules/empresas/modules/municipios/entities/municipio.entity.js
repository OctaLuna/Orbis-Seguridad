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
exports.Municipio = void 0;
const typeorm_1 = require("typeorm");
const municipio_empresa_entity_1 = require("../modules/municipios-empresa/entities/municipio-empresa.entity");
const empresa_entity_1 = require("../../../entities/empresa.entity");
let Municipio = class Municipio {
    id;
    idDepartamento;
    nombreMunicipio;
    municipiosEmpresas;
    empresas;
};
exports.Municipio = Municipio;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_municipio' }),
    __metadata("design:type", Number)
], Municipio.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'id_departamento' }),
    __metadata("design:type", Number)
], Municipio.prototype, "idDepartamento", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, name: 'nombre_municipio' }),
    __metadata("design:type", String)
], Municipio.prototype, "nombreMunicipio", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => municipio_empresa_entity_1.MunicipioEmpresa, (municipioEmpresa) => municipioEmpresa.municipio),
    __metadata("design:type", Array)
], Municipio.prototype, "municipiosEmpresas", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => empresa_entity_1.Empresa, (empresa) => empresa.municipios),
    __metadata("design:type", Array)
], Municipio.prototype, "empresas", void 0);
exports.Municipio = Municipio = __decorate([
    (0, typeorm_1.Entity)('municipios')
], Municipio);
//# sourceMappingURL=municipio.entity.js.map