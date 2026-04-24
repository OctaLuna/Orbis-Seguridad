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
exports.SedePrivateDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const departamento_public_dto_1 = require("../../departamentos/dto/departamento-public.dto");
class SedePrivateDto {
    id;
    departamento;
    esCentral;
}
exports.SedePrivateDto = SedePrivateDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Id de la sede de la empresa',
        type: Number
    }),
    __metadata("design:type", Number)
], SedePrivateDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Departamento de la sede',
        type: departamento_public_dto_1.DepartamentoPublicDto
    }),
    __metadata("design:type", departamento_public_dto_1.DepartamentoPublicDto)
], SedePrivateDto.prototype, "departamento", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Define si la sede es central',
        type: Boolean
    }),
    __metadata("design:type", Boolean)
], SedePrivateDto.prototype, "esCentral", void 0);
//# sourceMappingURL=sede-private.dto.js.map