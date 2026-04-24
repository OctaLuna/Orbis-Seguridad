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
exports.GetEmpresasTamaniosDto = exports.EmpresaTamanioDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class EmpresaTamanioDto {
    idTamanio;
    nombreTamanio;
    total;
    porcentaje;
}
exports.EmpresaTamanioDto = EmpresaTamanioDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Id del tamanio de empresa',
        type: Number,
    }),
    __metadata("design:type", Number)
], EmpresaTamanioDto.prototype, "idTamanio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nombre del tamanio de empresa',
        type: String
    }),
    __metadata("design:type", String)
], EmpresaTamanioDto.prototype, "nombreTamanio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total de empresas relacionadas a este tamanio',
        type: Number
    }),
    __metadata("design:type", Number)
], EmpresaTamanioDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Porcentaje'
    }),
    __metadata("design:type", Number)
], EmpresaTamanioDto.prototype, "porcentaje", void 0);
class GetEmpresasTamaniosDto {
    tamanios;
}
exports.GetEmpresasTamaniosDto = GetEmpresasTamaniosDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Lista de tamanios con datos estadisticos',
        type: [EmpresaTamanioDto]
    }),
    __metadata("design:type", Array)
], GetEmpresasTamaniosDto.prototype, "tamanios", void 0);
//# sourceMappingURL=get-empresas-tamanios.dto.js.map