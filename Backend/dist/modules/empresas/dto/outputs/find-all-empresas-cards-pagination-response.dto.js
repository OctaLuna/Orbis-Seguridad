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
exports.FindAllEmpresasCardsPaginationResponseDto = void 0;
const pagination_response_dto_1 = require("../../../../shared/dto/pagination-response.dto");
const swagger_1 = require("@nestjs/swagger");
const empresa_card_dto_1 = require("../empresa-card.dto");
class FindAllEmpresasCardsPaginationResponseDto extends pagination_response_dto_1.PaginationResponseDto {
}
exports.FindAllEmpresasCardsPaginationResponseDto = FindAllEmpresasCardsPaginationResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Array de elementos de la página actual',
        type: empresa_card_dto_1.EmpresaCardDto,
        isArray: true,
    }),
    __metadata("design:type", Array)
], FindAllEmpresasCardsPaginationResponseDto.prototype, "data", void 0);
//# sourceMappingURL=find-all-empresas-cards-pagination-response.dto.js.map