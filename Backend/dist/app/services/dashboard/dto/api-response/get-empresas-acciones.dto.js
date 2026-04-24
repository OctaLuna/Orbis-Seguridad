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
exports.GetEmpresasAccionesDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class GetEmpresasAccionesDto {
    conAcciones;
    sinAcciones;
}
exports.GetEmpresasAccionesDto = GetEmpresasAccionesDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Porcentaje de empresas que tienen al menos un ods registrado',
        example: 72.5,
        type: Number,
    }),
    __metadata("design:type", Number)
], GetEmpresasAccionesDto.prototype, "conAcciones", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Porcentaje de empresas que no tienen ningun ods registrado',
        example: 27.5,
        type: Number,
    }),
    __metadata("design:type", Number)
], GetEmpresasAccionesDto.prototype, "sinAcciones", void 0);
//# sourceMappingURL=get-empresas-acciones.dto.js.map