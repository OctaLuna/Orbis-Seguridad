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
exports.FindAllDatamartResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const empresa_dt_dto_1 = require("../empresa-dt.dto");
class FindAllDatamartResponseDto {
    empresas;
}
exports.FindAllDatamartResponseDto = FindAllDatamartResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Empresas registradas en el datamart',
        type: [empresa_dt_dto_1.EmpresaDtDto]
    }),
    __metadata("design:type", Array)
], FindAllDatamartResponseDto.prototype, "empresas", void 0);
//# sourceMappingURL=find-all-datamart-response.dto.js.map