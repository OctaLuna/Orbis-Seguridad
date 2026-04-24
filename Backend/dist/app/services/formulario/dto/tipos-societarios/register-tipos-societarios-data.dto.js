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
exports.RegisterTiposSocietariosDataDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class RegisterTiposSocietariosDataDto {
    idTipoSocietario;
    esActivo;
    fechaCambio;
}
exports.RegisterTiposSocietariosDataDto = RegisterTiposSocietariosDataDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Id del tipo societario seleccionado',
        type: Number
    }),
    __metadata("design:type", Number)
], RegisterTiposSocietariosDataDto.prototype, "idTipoSocietario", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tipo de respuesta: true = default, false = si cambio antes',
        type: Boolean,
        default: true
    }),
    __metadata("design:type", Boolean)
], RegisterTiposSocietariosDataDto.prototype, "esActivo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Fecha que se cambio, solo si esActivo es false',
        type: String,
        nullable: true,
        example: '2000-01-01'
    }),
    __metadata("design:type", String)
], RegisterTiposSocietariosDataDto.prototype, "fechaCambio", void 0);
//# sourceMappingURL=register-tipos-societarios-data.dto.js.map