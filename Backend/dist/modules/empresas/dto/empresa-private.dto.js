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
exports.EmpresaPrivateDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const tamanio_empresa_private_dto_1 = require("../modules/tamanios-empresas/dto/tamanio-empresa-private.dto");
const rubro_empresa_private_dto_1 = require("../modules/rubros/modules/rubros-empresas/dto/rubro-empresa-private.dto");
const sede_private_dto_1 = require("../modules/sedes/dto/sede-private.dto");
const municipio_private_dto_1 = require("../modules/municipios/dto/municipio-private.dto");
const servicio_private_dto_1 = require("../modules/servicios/dto/servicio-private.dto");
const item_private_dto_1 = require("../modules/items/dto/item-private.dto");
const empresa_tipo_societario_private_dto_1 = require("../modules/tipos-societarios/modules/empresas-tipos-societarios/dto/empresa-tipo-societario-private.dto");
const hito_public_dto_1 = require("../modules/hitos/dto/hito-public.dto");
const premio_private_dto_1 = require("../modules/premios/dto/premio-private.dto");
const familia_private_dto_1 = require("../modules/familias/dto/familia-private.dto");
const pais_dto_1 = require("../modules/paises/dto/pais.dto");
const fundador_dto_1 = require("../modules/fundadores/dto/fundador.dto");
const imagen_card_dto_1 = require("../modules/imagenes/dto/imagen-card.dto");
const implementacion_private_dto_1 = require("../modules/implementaciones/dto/implementacion-private.dto");
class EmpresaPrivateDto {
    id;
    nombreComercial;
    fechaFundacion;
    vision;
    mision;
    direccionWeb;
    tamanioEmpresa;
    mensaje;
    actividad;
    rubrosEmpresa;
    sedes;
    municipios;
    servicios;
    items;
    tiposSocietariosEmpresa;
    hitos;
    premios;
    familias;
    paisesOperaInteranacionalmente;
    fundadores;
    imagenes;
    implementacion;
}
exports.EmpresaPrivateDto = EmpresaPrivateDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Id de la empresa',
        type: Number
    }),
    __metadata("design:type", Number)
], EmpresaPrivateDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nombre de la empresa',
        type: String
    }),
    __metadata("design:type", String)
], EmpresaPrivateDto.prototype, "nombreComercial", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Fecha de fundacion',
        type: String
    }),
    __metadata("design:type", String)
], EmpresaPrivateDto.prototype, "fechaFundacion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Vision de la empresa',
        type: String
    }),
    __metadata("design:type", String)
], EmpresaPrivateDto.prototype, "vision", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Mision de la empresa',
        type: String
    }),
    __metadata("design:type", String)
], EmpresaPrivateDto.prototype, "mision", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Direccion web',
        type: String
    }),
    __metadata("design:type", String)
], EmpresaPrivateDto.prototype, "direccionWeb", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tmanio de la empresa',
        type: tamanio_empresa_private_dto_1.TamanioEmpresaPrivateDto
    }),
    __metadata("design:type", tamanio_empresa_private_dto_1.TamanioEmpresaPrivateDto)
], EmpresaPrivateDto.prototype, "tamanioEmpresa", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Mensaje de la empresas',
        type: String
    }),
    __metadata("design:type", String)
], EmpresaPrivateDto.prototype, "mensaje", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Actividad de la empresa',
        type: String
    }),
    __metadata("design:type", String)
], EmpresaPrivateDto.prototype, "actividad", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Lista de rubros relacionados con la empresa',
        type: [rubro_empresa_private_dto_1.RubroEmpresaPrivateDto]
    }),
    __metadata("design:type", Array)
], EmpresaPrivateDto.prototype, "rubrosEmpresa", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Sedes de la empresa',
        type: [sede_private_dto_1.SedePrivateDto]
    }),
    __metadata("design:type", Array)
], EmpresaPrivateDto.prototype, "sedes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Municipios donde se encuentra la empresa',
        type: [municipio_private_dto_1.MunicipioPrivateDto]
    }),
    __metadata("design:type", Array)
], EmpresaPrivateDto.prototype, "municipios", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Servicio de la empresa',
        type: [servicio_private_dto_1.ServicioPrivateDto]
    }),
    __metadata("design:type", Array)
], EmpresaPrivateDto.prototype, "servicios", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Items de la empresa',
        type: [item_private_dto_1.ItemPrivateDto]
    }),
    __metadata("design:type", Array)
], EmpresaPrivateDto.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Id de la relacion entre los tipos de societario y la empresa',
        type: [empresa_tipo_societario_private_dto_1.EmpresaTipoSocietarioPrivateDto]
    }),
    __metadata("design:type", Array)
], EmpresaPrivateDto.prototype, "tiposSocietariosEmpresa", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Hitos de la empresa',
        type: [hito_public_dto_1.HitoPublicDto]
    }),
    __metadata("design:type", Array)
], EmpresaPrivateDto.prototype, "hitos", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Premios de la empresa',
        type: [premio_private_dto_1.PremioPrivateDto]
    }),
    __metadata("design:type", Array)
], EmpresaPrivateDto.prototype, "premios", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Familiar de la empresas',
        type: [familia_private_dto_1.FamiliaPrivateDto]
    }),
    __metadata("design:type", Array)
], EmpresaPrivateDto.prototype, "familias", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Paises en que la empresa opera internacionalmente',
        type: [pais_dto_1.PaisDto]
    }),
    __metadata("design:type", Array)
], EmpresaPrivateDto.prototype, "paisesOperaInteranacionalmente", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Fundadore de la empresa',
        type: [fundador_dto_1.FundadorDto]
    }),
    __metadata("design:type", Array)
], EmpresaPrivateDto.prototype, "fundadores", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Lista de url de imagenens de la empresa',
        type: [imagen_card_dto_1.ImagenCardDto]
    }),
    __metadata("design:type", Array)
], EmpresaPrivateDto.prototype, "imagenes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Implementacion de empresa',
        type: implementacion_private_dto_1.ImplementacionPrivateDto
    }),
    __metadata("design:type", implementacion_private_dto_1.ImplementacionPrivateDto)
], EmpresaPrivateDto.prototype, "implementacion", void 0);
//# sourceMappingURL=empresa-private.dto.js.map