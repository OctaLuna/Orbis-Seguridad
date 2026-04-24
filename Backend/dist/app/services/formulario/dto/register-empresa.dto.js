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
exports.RegisterEmpresaDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const register_rubros_dto_1 = require("./rubros/register-rubros.dto");
const register_tipos_societarios_dto_1 = require("./tipos-societarios/register-tipos-societarios.dto");
const register_familia_dto_1 = require("./register-familia.dto");
const register_sede_dto_1 = require("./register-sede.dto");
const register_reconocimiento_dto_1 = require("./register-reconocimiento.dto");
const register_implementacion_dto_1 = require("./implementacion/register-implementacion.dto");
const register_hito_dto_1 = require("./register-hito.dto");
class RegisterEmpresaDto {
    nombre;
    rubros;
    actividad;
    items;
    servicios;
    direccionWeb;
    fechaFundacion;
    fundadores;
    tiposSocietarios;
    tamanioEmpresa;
    mision;
    vision;
    familia;
    sedes;
    municipios;
    paisesOperaInternacionalmente;
    reconocimientos;
    imagenes;
    mensajeConmemorativo;
    implementacion;
    hitos;
}
exports.RegisterEmpresaDto = RegisterEmpresaDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nombre de la empresa',
        type: String
    }),
    __metadata("design:type", String)
], RegisterEmpresaDto.prototype, "nombre", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Registro de rubro para la empresa',
        type: register_rubros_dto_1.RegisterRubrosDto
    }),
    __metadata("design:type", register_rubros_dto_1.RegisterRubrosDto)
], RegisterEmpresaDto.prototype, "rubros", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Actividad principal detallada de la empresa',
        type: String,
        nullable: false
    }),
    __metadata("design:type", String)
], RegisterEmpresaDto.prototype, "actividad", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Items que ofrece le empresa',
        type: [String]
    }),
    __metadata("design:type", Array)
], RegisterEmpresaDto.prototype, "items", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Servicio que la empresa ofrese',
        type: [String],
        isArray: true,
        example: ['servicio1', 'servicio2']
    }),
    __metadata("design:type", Array)
], RegisterEmpresaDto.prototype, "servicios", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Direccion web de la empresa',
        type: String
    }),
    __metadata("design:type", String)
], RegisterEmpresaDto.prototype, "direccionWeb", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Fecha de fundacion de la empresa',
        type: String,
        example: '2000-01-01'
    }),
    __metadata("design:type", String)
], RegisterEmpresaDto.prototype, "fechaFundacion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Fundadores de la empresa',
        type: [String],
        isArray: true,
        example: ['Jaime', 'Octavio', 'Sergio']
    }),
    __metadata("design:type", Array)
], RegisterEmpresaDto.prototype, "fundadores", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tipos societarios de la empresa',
        type: register_tipos_societarios_dto_1.RegisterTiposSocietariosDto
    }),
    __metadata("design:type", register_tipos_societarios_dto_1.RegisterTiposSocietariosDto)
], RegisterEmpresaDto.prototype, "tiposSocietarios", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Id del el tamanio de la empresa seleccionada',
        type: Number
    }),
    __metadata("design:type", Number)
], RegisterEmpresaDto.prototype, "tamanioEmpresa", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Mision de la empresa',
        type: String
    }),
    __metadata("design:type", String)
], RegisterEmpresaDto.prototype, "mision", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Vision de la empresa',
        type: String
    }),
    __metadata("design:type", String)
], RegisterEmpresaDto.prototype, "vision", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Pregunta 15.1 y 15.2',
        type: register_familia_dto_1.RegisterFamiliaDto
    }),
    __metadata("design:type", register_familia_dto_1.RegisterFamiliaDto)
], RegisterEmpresaDto.prototype, "familia", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Sedes en la que la empresa opera',
        type: [register_sede_dto_1.RegisterSedeDto]
    }),
    __metadata("design:type", Array)
], RegisterEmpresaDto.prototype, "sedes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Id de municipio donde las sedes se encuentran, filtrar por departamentos elejidos',
        type: [Number],
        example: [1, 2, 3]
    }),
    __metadata("design:type", Array)
], RegisterEmpresaDto.prototype, "municipios", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Ids de paises en los que la empresa opera internacionamente',
        type: [Number],
        example: [1, 2, 3]
    }),
    __metadata("design:type", Array)
], RegisterEmpresaDto.prototype, "paisesOperaInternacionalmente", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Reconocimientos de la empresa',
        type: [register_reconocimiento_dto_1.RegisterReconocimientoDto]
    }),
    __metadata("design:type", Array)
], RegisterEmpresaDto.prototype, "reconocimientos", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Urls de imagenes que tiene la empresa',
        type: [String]
    }),
    __metadata("design:type", Array)
], RegisterEmpresaDto.prototype, "imagenes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Mensaje conmemorativo de la empresa',
        type: String
    }),
    __metadata("design:type", String)
], RegisterEmpresaDto.prototype, "mensajeConmemorativo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Esta seccion encapsula las ultimas 3 preguntas, sin contar la de hitos',
        type: register_implementacion_dto_1.RegisterImplementacionDto
    }),
    __metadata("design:type", register_implementacion_dto_1.RegisterImplementacionDto)
], RegisterEmpresaDto.prototype, "implementacion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Hitos de la empresa',
        type: [register_hito_dto_1.RegisterHitoDto]
    }),
    __metadata("design:type", Array)
], RegisterEmpresaDto.prototype, "hitos", void 0);
//# sourceMappingURL=register-empresa.dto.js.map