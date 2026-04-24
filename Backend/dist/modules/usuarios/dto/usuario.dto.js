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
exports.UsuarioDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UsuarioDto {
    id;
    usuario;
    correo;
    idRol;
    expiracion;
}
exports.UsuarioDto = UsuarioDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Identificador único del usuario',
        example: 1,
    }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], UsuarioDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nombre de usuario (mínimo 1, máximo 50 caracteres)',
        example: 'jdoe',
    }),
    __metadata("design:type", String)
], UsuarioDto.prototype, "usuario", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Correo electrónico del usuario',
        example: 'usuario@ejemplo.com',
    }),
    __metadata("design:type", String)
], UsuarioDto.prototype, "correo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID del rol asignado al usuario',
        example: 2,
    }),
    __metadata("design:type", Number)
], UsuarioDto.prototype, "idRol", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Fecha de expiración de la cuenta (puede ser nula)',
        example: '2025-12-31T23:59:59.000Z',
        required: false,
    }),
    __metadata("design:type", Date)
], UsuarioDto.prototype, "expiracion", void 0);
//# sourceMappingURL=usuario.dto.js.map