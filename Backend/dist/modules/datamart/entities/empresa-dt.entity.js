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
exports.EmpresaDt = void 0;
const typeorm_1 = require("typeorm");
const municipio_dt_entity_1 = require("./municipio-dt.entity");
const ods_dt_entity_1 = require("./ods-dt.entity");
const pais_dt_entity_1 = require("./pais-dt.entity");
const sede_dt_entity_1 = require("./sede-dt.entity");
let EmpresaDt = class EmpresaDt {
    id;
    nombre;
    fechaFundacion;
    tamanioEmpresa;
    empresaFamiliar;
    rubro;
    esPropioRubro;
    cambioRubro;
    tipoSocietaria;
    esPropioTipoSocietario;
    cambioTipoSocietario;
    oficinaCentral;
    operacionesInternacionales;
    impactoSocial;
    sostenibilidad;
    anioDeImplementacionImpacto;
    paises;
    municipios;
    sedes;
    ods;
};
exports.EmpresaDt = EmpresaDt;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_empresa' }),
    __metadata("design:type", Number)
], EmpresaDt.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nombre_empresa', type: 'text' }),
    __metadata("design:type", String)
], EmpresaDt.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_fundacion', type: 'date' }),
    __metadata("design:type", Date)
], EmpresaDt.prototype, "fechaFundacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tamanio_empresa', type: 'text' }),
    __metadata("design:type", String)
], EmpresaDt.prototype, "tamanioEmpresa", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'empresa_familiar', type: 'boolean' }),
    __metadata("design:type", Boolean)
], EmpresaDt.prototype, "empresaFamiliar", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'rubro', type: 'text' }),
    __metadata("design:type", String)
], EmpresaDt.prototype, "rubro", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'es_propio_rubro', type: 'boolean' }),
    __metadata("design:type", Boolean)
], EmpresaDt.prototype, "esPropioRubro", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cambio_rubro', type: 'boolean' }),
    __metadata("design:type", Boolean)
], EmpresaDt.prototype, "cambioRubro", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'tipo_societaria', type: 'text' }),
    __metadata("design:type", String)
], EmpresaDt.prototype, "tipoSocietaria", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'es_propio_tipo_societario', type: 'boolean' }),
    __metadata("design:type", Boolean)
], EmpresaDt.prototype, "esPropioTipoSocietario", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cambio_tipo_societario', type: 'boolean' }),
    __metadata("design:type", Boolean)
], EmpresaDt.prototype, "cambioTipoSocietario", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'oficina_central', type: 'text' }),
    __metadata("design:type", String)
], EmpresaDt.prototype, "oficinaCentral", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'operaciones_internacionales', type: 'boolean' }),
    __metadata("design:type", Boolean)
], EmpresaDt.prototype, "operacionesInternacionales", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'impacto_social', type: 'boolean', nullable: true }),
    __metadata("design:type", Boolean)
], EmpresaDt.prototype, "impactoSocial", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'sostenibilidad', type: 'boolean', nullable: true }),
    __metadata("design:type", Boolean)
], EmpresaDt.prototype, "sostenibilidad", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'anio_de_implementacion_impacto', type: 'date', nullable: true }),
    __metadata("design:type", Date)
], EmpresaDt.prototype, "anioDeImplementacionImpacto", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => pais_dt_entity_1.PaisDt, (pais) => pais.empresa),
    __metadata("design:type", Array)
], EmpresaDt.prototype, "paises", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => municipio_dt_entity_1.MunicipioDt, (municipio) => municipio.empresa),
    __metadata("design:type", Array)
], EmpresaDt.prototype, "municipios", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => sede_dt_entity_1.SedeDt, (sede) => sede.empresa),
    __metadata("design:type", Array)
], EmpresaDt.prototype, "sedes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ods_dt_entity_1.OdsDt, (ods) => ods.empresa),
    __metadata("design:type", Array)
], EmpresaDt.prototype, "ods", void 0);
exports.EmpresaDt = EmpresaDt = __decorate([
    (0, typeorm_1.Entity)('empresas_dt')
], EmpresaDt);
//# sourceMappingURL=empresa-dt.entity.js.map