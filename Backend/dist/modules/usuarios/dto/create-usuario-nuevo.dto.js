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
exports.CreateUsuarioNuevoDto = exports.PermisosAdminDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class PermisosAdminDto {
    panelUsuarios;
    editarEmpresas;
    formularioExterno;
}
exports.PermisosAdminDto = PermisosAdminDto;
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], PermisosAdminDto.prototype, "panelUsuarios", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], PermisosAdminDto.prototype, "editarEmpresas", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], PermisosAdminDto.prototype, "formularioExterno", void 0);
class CreateUsuarioNuevoDto {
    nombre;
    apellidoPaterno;
    apellidoMaterno;
    correoReal;
    tipoRol;
    permisos;
    rubrosAsignados;
}
exports.CreateUsuarioNuevoDto = CreateUsuarioNuevoDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Octavio' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUsuarioNuevoDto.prototype, "nombre", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Luna' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateUsuarioNuevoDto.prototype, "apellidoPaterno", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'García' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateUsuarioNuevoDto.prototype, "apellidoMaterno", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'octavio.personal@gmail.com' }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateUsuarioNuevoDto.prototype, "correoReal", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: ['admin', 'investigador'] }),
    (0, class_validator_1.IsIn)(['admin', 'investigador']),
    __metadata("design:type", String)
], CreateUsuarioNuevoDto.prototype, "tipoRol", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((o) => o.tipoRol === 'admin'),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => PermisosAdminDto),
    (0, swagger_1.ApiPropertyOptional)({ type: PermisosAdminDto }),
    __metadata("design:type", PermisosAdminDto)
], CreateUsuarioNuevoDto.prototype, "permisos", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)((o) => o.tipoRol === 'investigador'),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsInt)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)({ type: [Number] }),
    __metadata("design:type", Array)
], CreateUsuarioNuevoDto.prototype, "rubrosAsignados", void 0);
//# sourceMappingURL=create-usuario-nuevo.dto.js.map