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
exports.RegisterTiposSocietariosOtrosDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class RegisterTiposSocietariosOtrosDto {
    nombre;
    esActivo;
    fechaCambio;
}
exports.RegisterTiposSocietariosOtrosDto = RegisterTiposSocietariosOtrosDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nombre del tipo societario ingresado',
        type: String
    }),
    __metadata("design:type", String)
], RegisterTiposSocietariosOtrosDto.prototype, "nombre", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tipo de respuesta: true = default, false = si cambio antes',
        type: Boolean,
        default: true
    }),
    __metadata("design:type", Boolean)
], RegisterTiposSocietariosOtrosDto.prototype, "esActivo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Fecha que se cambio, solo si esActivo es false',
        type: String,
        nullable: true,
        example: '2000-01-01'
    }),
    __metadata("design:type", String)
], RegisterTiposSocietariosOtrosDto.prototype, "fechaCambio", void 0);
//# sourceMappingURL=register-tipos-societarios-otros.dto.js.map