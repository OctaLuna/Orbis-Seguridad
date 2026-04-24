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
exports.RubroEmpresaPrivateDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const rubro_private_dto_1 = require("../../../dto/rubro-private.dto");
class RubroEmpresaPrivateDto {
    id;
    rubro;
    esActivo;
}
exports.RubroEmpresaPrivateDto = RubroEmpresaPrivateDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Id del rubro de la emrpesa',
        type: Number
    }),
    __metadata("design:type", Number)
], RubroEmpresaPrivateDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Rubro de le empresa',
        type: rubro_private_dto_1.RubroPrivateDto
    }),
    __metadata("design:type", rubro_private_dto_1.RubroPrivateDto)
], RubroEmpresaPrivateDto.prototype, "rubro", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Define que si esta activo',
        type: Boolean
    }),
    __metadata("design:type", Boolean)
], RubroEmpresaPrivateDto.prototype, "esActivo", void 0);
//# sourceMappingURL=rubro-empresa-private.dto.js.map