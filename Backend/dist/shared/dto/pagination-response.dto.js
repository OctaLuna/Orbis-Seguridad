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
exports.PaginationResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class PaginationResponseDto {
    data;
    page;
    limit;
    pages;
    total;
}
exports.PaginationResponseDto = PaginationResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Array de elementos de la página actual',
        type: Object,
        isArray: true,
    }),
    __metadata("design:type", Array)
], PaginationResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Número de la página actual',
        type: Number,
        example: 1,
    }),
    __metadata("design:type", Number)
], PaginationResponseDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Cantidad de elementos por página',
        type: Number,
        example: 10,
    }),
    __metadata("design:type", Number)
], PaginationResponseDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Cantidad total de páginas disponibles',
        type: Number,
        example: 5,
    }),
    __metadata("design:type", Number)
], PaginationResponseDto.prototype, "pages", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Cantidad total de registros encontrados',
        type: Number,
        example: 42,
    }),
    __metadata("design:type", Number)
], PaginationResponseDto.prototype, "total", void 0);
//# sourceMappingURL=pagination-response.dto.js.map