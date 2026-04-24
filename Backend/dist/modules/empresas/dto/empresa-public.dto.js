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
exports.EmpresaPublicDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const rubro_empresa_public_dto_1 = require("../modules/rubros/modules/rubros-empresas/dto/rubro-empresa-public.dto");
const departamento_public_dto_1 = require("../modules/departamentos/dto/departamento-public.dto");
const hito_public_dto_1 = require("../modules/hitos/dto/hito-public.dto");
class EmpresaPublicDto {
    id;
    nombreComercial;
    mensaje;
    rubrosEmpresa;
    departamento;
    imagenes;
    hitos;
}
exports.EmpresaPublicDto = EmpresaPublicDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Id de la empresa',
        type: Number
    }),
    __metadata("design:type", Number)
], EmpresaPublicDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nombre de la empresa',
        type: String
    }),
    __metadata("design:type", String)
], EmpresaPublicDto.prototype, "nombreComercial", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Mensaje de la empresas',
        type: String
    }),
    __metadata("design:type", String)
], EmpresaPublicDto.prototype, "mensaje", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Lista de rubros relacionados con la empresa',
        type: [rubro_empresa_public_dto_1.RubroEmpresaPublicDto]
    }),
    __metadata("design:type", Array)
], EmpresaPublicDto.prototype, "rubrosEmpresa", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Sede central de la empresa',
        type: departamento_public_dto_1.DepartamentoPublicDto
    }),
    __metadata("design:type", departamento_public_dto_1.DepartamentoPublicDto)
], EmpresaPublicDto.prototype, "departamento", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Lista de url de imagenens de la empresa',
        type: [String]
    }),
    __metadata("design:type", Array)
], EmpresaPublicDto.prototype, "imagenes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Hitos de la empresa',
        type: [hito_public_dto_1.HitoPublicDto]
    }),
    __metadata("design:type", Array)
], EmpresaPublicDto.prototype, "hitos", void 0);
//# sourceMappingURL=empresa-public.dto.js.map