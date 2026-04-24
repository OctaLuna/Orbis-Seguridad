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
exports.EmpresaCardDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const imagen_card_dto_1 = require("../modules/imagenes/dto/imagen-card.dto");
const hito_public_dto_1 = require("../modules/hitos/dto/hito-public.dto");
const departamento_public_dto_1 = require("../modules/departamentos/dto/departamento-public.dto");
class EmpresaCardDto {
    id;
    nombreComercial;
    imagenes;
    hitos;
    sedeCentral;
}
exports.EmpresaCardDto = EmpresaCardDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Id de la empresa',
        type: Number
    }),
    __metadata("design:type", Number)
], EmpresaCardDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nomnre comercial de la empresa',
        type: String
    }),
    __metadata("design:type", String)
], EmpresaCardDto.prototype, "nombreComercial", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Imagnes de la empresa',
        type: [imagen_card_dto_1.ImagenCardDto]
    }),
    __metadata("design:type", Array)
], EmpresaCardDto.prototype, "imagenes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Lista de hitsos de la empresa',
        type: [hito_public_dto_1.HitoPublicDto]
    }),
    __metadata("design:type", Array)
], EmpresaCardDto.prototype, "hitos", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Depratamento central',
        type: departamento_public_dto_1.DepartamentoPublicDto
    }),
    __metadata("design:type", departamento_public_dto_1.DepartamentoPublicDto)
], EmpresaCardDto.prototype, "sedeCentral", void 0);
//# sourceMappingURL=empresa-card.dto.js.map