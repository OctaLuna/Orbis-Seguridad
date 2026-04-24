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
exports.GetEmpresasDepartamentosResponseDto = exports.GetEmpresaDepartementoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class GetEmpresaDepartementoDto {
    idDepartamento;
    nombreDepartamento;
    cantidadEmpresas;
}
exports.GetEmpresaDepartementoDto = GetEmpresaDepartementoDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: "Identificador único del departamento.",
        type: Number,
    }),
    __metadata("design:type", Number)
], GetEmpresaDepartementoDto.prototype, "idDepartamento", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: "La Paz",
        description: "Nombre del departamento.",
        type: String,
    }),
    __metadata("design:type", String)
], GetEmpresaDepartementoDto.prototype, "nombreDepartamento", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 5,
        description: "Cantidad total de empresas que tienen sede central en este departamento.",
        type: Number,
    }),
    __metadata("design:type", Number)
], GetEmpresaDepartementoDto.prototype, "cantidadEmpresas", void 0);
class GetEmpresasDepartamentosResponseDto {
    departamentos;
}
exports.GetEmpresasDepartamentosResponseDto = GetEmpresasDepartamentosResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Conteos de empresas por departamentos',
        type: [GetEmpresaDepartementoDto]
    }),
    __metadata("design:type", Array)
], GetEmpresasDepartamentosResponseDto.prototype, "departamentos", void 0);
//# sourceMappingURL=get-empresas-departamento.dto.js.map