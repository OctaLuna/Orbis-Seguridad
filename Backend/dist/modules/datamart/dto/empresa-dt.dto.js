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
exports.EmpresaDtDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const pais_dt_dto_1 = require("./pais-dt.dto");
const municipio_dt_dto_1 = require("./municipio-dt.dto");
const sede_dt_dto_1 = require("./sede-dt.dto");
const ods_dt_dto_1 = require("./ods-dt.dto");
class EmpresaDtDto {
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
}
exports.EmpresaDtDto = EmpresaDtDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Identificador único de la empresa', type: Number }),
    __metadata("design:type", Number)
], EmpresaDtDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nombre de la empresa', type: String }),
    __metadata("design:type", String)
], EmpresaDtDto.prototype, "nombre", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Fecha de fundación de la empresa',
        example: '2001-05-14',
        type: Date,
    }),
    __metadata("design:type", Date)
], EmpresaDtDto.prototype, "fechaFundacion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tamaño de la empresa (micro, pequeña, mediana, grande)',
        type: String,
    }),
    __metadata("design:type", String)
], EmpresaDtDto.prototype, "tamanioEmpresa", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Indica si la empresa es familiar', type: Boolean }),
    __metadata("design:type", Boolean)
], EmpresaDtDto.prototype, "empresaFamiliar", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Rubro principal de la empresa', type: String }),
    __metadata("design:type", String)
], EmpresaDtDto.prototype, "rubro", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Indica si el rubro actual es el propio de la empresa',
        type: Boolean,
    }),
    __metadata("design:type", Boolean)
], EmpresaDtDto.prototype, "esPropioRubro", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Indica si la empresa ha cambiado de rubro',
        type: Boolean,
    }),
    __metadata("design:type", Boolean)
], EmpresaDtDto.prototype, "cambioRubro", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Tipo societario de la empresa', type: String }),
    __metadata("design:type", String)
], EmpresaDtDto.prototype, "tipoSocietaria", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Indica si el tipo societario actual es el propio de la empresa',
        type: Boolean,
    }),
    __metadata("design:type", Boolean)
], EmpresaDtDto.prototype, "esPropioTipoSocietario", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Indica si ha habido cambio de tipo societario',
        type: Boolean,
    }),
    __metadata("design:type", Boolean)
], EmpresaDtDto.prototype, "cambioTipoSocietario", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Ubicación de la oficina central de la empresa',
        type: String,
    }),
    __metadata("design:type", String)
], EmpresaDtDto.prototype, "oficinaCentral", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Indica si realiza operaciones internacionales',
        type: Boolean,
    }),
    __metadata("design:type", Boolean)
], EmpresaDtDto.prototype, "operacionesInternacionales", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Indica si la empresa tiene impacto social',
        type: Boolean,
        nullable: true,
    }),
    __metadata("design:type", Boolean)
], EmpresaDtDto.prototype, "impactoSocial", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Indica si la empresa aplica criterios de sostenibilidad',
        type: Boolean,
        nullable: true,
    }),
    __metadata("design:type", Boolean)
], EmpresaDtDto.prototype, "sostenibilidad", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Año de implementación del impacto social',
        example: '2023-01-01',
        type: Date,
        nullable: true,
    }),
    __metadata("design:type", Date)
], EmpresaDtDto.prototype, "anioDeImplementacionImpacto", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Países donde la empresa tiene presencia',
        type: [pais_dt_dto_1.PaisDtDto],
    }),
    __metadata("design:type", Array)
], EmpresaDtDto.prototype, "paises", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Municipios donde la empresa opera',
        type: [municipio_dt_dto_1.MunicipioDtDto],
    }),
    __metadata("design:type", Array)
], EmpresaDtDto.prototype, "municipios", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Sedes asociadas a la empresa',
        type: [sede_dt_dto_1.SedeDtDto],
    }),
    __metadata("design:type", Array)
], EmpresaDtDto.prototype, "sedes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Objetivos de Desarrollo Sostenible (ODS) asociados a la empresa',
        type: [ods_dt_dto_1.OdsDtDto],
    }),
    __metadata("design:type", Array)
], EmpresaDtDto.prototype, "ods", void 0);
//# sourceMappingURL=empresa-dt.dto.js.map