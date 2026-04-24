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
exports.PaginationParamsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class PaginationParamsDto {
    page = 1;
    limit = 10;
}
exports.PaginationParamsDto = PaginationParamsDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Número de la página (empieza en 1). Si no se envía, se toma por defecto el valor 1.",
        example: 2,
        default: 1,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)({ message: "El parámetro 'page' debe ser un número entero" }),
    (0, class_validator_1.Min)(1, { message: "El parámetro 'page' debe ser mayor o igual a 1" }),
    __metadata("design:type", Number)
], PaginationParamsDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Cantidad de resultados por página. Si no se envía, se toma por defecto el valor 10.",
        example: 20,
        default: 10,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)({ message: "El parámetro 'limit' debe ser un número entero" }),
    (0, class_validator_1.Min)(1, { message: "El parámetro 'limit' debe ser mayor o igual a 1" }),
    __metadata("design:type", Number)
], PaginationParamsDto.prototype, "limit", void 0);
//# sourceMappingURL=pagination-params.dto.js.map