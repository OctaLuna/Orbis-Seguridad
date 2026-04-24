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
exports.PremioPrivateDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class PremioPrivateDto {
    id;
    nombre;
    esPremio;
    esNacional;
}
exports.PremioPrivateDto = PremioPrivateDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Id del premio',
        type: Number
    }),
    __metadata("design:type", Number)
], PremioPrivateDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nombre del premio',
        type: String
    }),
    __metadata("design:type", String)
], PremioPrivateDto.prototype, "nombre", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Define si es premio o reconocimiento',
        type: Boolean
    }),
    __metadata("design:type", Boolean)
], PremioPrivateDto.prototype, "esPremio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Define si es nacional',
        type: Boolean
    }),
    __metadata("design:type", Boolean)
], PremioPrivateDto.prototype, "esNacional", void 0);
//# sourceMappingURL=premio-private.dto.js.map