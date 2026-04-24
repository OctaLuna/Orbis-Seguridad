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
exports.RegisterReconocimientoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class RegisterReconocimientoDto {
    nombre;
    esPremio;
    esNacional;
    anio;
}
exports.RegisterReconocimientoDto = RegisterReconocimientoDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'nombre del reconocimiento',
        type: String
    }),
    __metadata("design:type", String)
], RegisterReconocimientoDto.prototype, "nombre", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'identificados si el reconocimiento es un premio o una distincion',
        type: Boolean
    }),
    __metadata("design:type", Boolean)
], RegisterReconocimientoDto.prototype, "esPremio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'identificados si el reconocimiento nacional o internacional',
        type: Boolean
    }),
    __metadata("design:type", Boolean)
], RegisterReconocimientoDto.prototype, "esNacional", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Anio en que obtuvo el premio',
        type: Number
    }),
    __metadata("design:type", Number)
], RegisterReconocimientoDto.prototype, "anio", void 0);
//# sourceMappingURL=register-reconocimiento.dto.js.map