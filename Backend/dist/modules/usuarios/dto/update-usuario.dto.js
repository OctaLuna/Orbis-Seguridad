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
exports.UpdateUsuarioDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class UpdateUsuarioDto {
    usuario;
    contrasenia;
    correo;
    idRol;
}
exports.UpdateUsuarioDto = UpdateUsuarioDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Nombre de usuario (entre 1 y 50 caracteres)',
        example: 'jdoe',
        type: String
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], UpdateUsuarioDto.prototype, "usuario", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Contraseña del usuario (mínimo 6 caracteres)',
        example: 'segura123',
        type: String
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], UpdateUsuarioDto.prototype, "contrasenia", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Correo electrónico válido',
        example: 'usuario@ejemplo.com',
        type: String
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.MaxLength)(150),
    __metadata("design:type", String)
], UpdateUsuarioDto.prototype, "correo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'ID del rol asignado al usuario',
        example: 2,
        type: String
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], UpdateUsuarioDto.prototype, "idRol", void 0);
//# sourceMappingURL=update-usuario.dto.js.map