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
exports.FamiliaPrivateDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class FamiliaPrivateDto {
    id;
    esFamiliar;
    anio;
}
exports.FamiliaPrivateDto = FamiliaPrivateDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Id de familiar',
        type: Number
    }),
    __metadata("design:type", Number)
], FamiliaPrivateDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Define si es familiar',
        type: Boolean
    }),
    __metadata("design:type", Boolean)
], FamiliaPrivateDto.prototype, "esFamiliar", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Fecha si es que alguna vez fue familiar',
        type: Number,
        nullable: true
    }),
    __metadata("design:type", Number)
], FamiliaPrivateDto.prototype, "anio", void 0);
//# sourceMappingURL=familia-private.dto.js.map