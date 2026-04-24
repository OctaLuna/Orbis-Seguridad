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
exports.FindAllEmpresasCardsPublicParamsDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const pagination_params_dto_1 = require("../../../../shared/dto/pagination-params.dto");
class FindAllEmpresasCardsPublicParamsDto extends pagination_params_dto_1.PaginationParamsDto {
    nombre;
}
exports.FindAllEmpresasCardsPublicParamsDto = FindAllEmpresasCardsPublicParamsDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Nombre comercial de la empresa (búsqueda parcial, no sensible a mayúsculas).',
        type: String,
        example: 'TecnoSur',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FindAllEmpresasCardsPublicParamsDto.prototype, "nombre", void 0);
//# sourceMappingURL=find-all-empresas-cards-public-params.dto.js.map