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
exports.EmpresaTipoSocietarioPrivateDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const tipo_societario_private_dto_1 = require("../../../dto/tipo-societario-private.dto");
class EmpresaTipoSocietarioPrivateDto {
    id;
    tipoSocietario;
    esActivo;
    fechaCambio;
}
exports.EmpresaTipoSocietarioPrivateDto = EmpresaTipoSocietarioPrivateDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Id de la relacion entre tipo societario y empresa',
        type: Number
    }),
    __metadata("design:type", Number)
], EmpresaTipoSocietarioPrivateDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tipo de societario',
        type: tipo_societario_private_dto_1.TipoSocietarioPrivateDto
    }),
    __metadata("design:type", tipo_societario_private_dto_1.TipoSocietarioPrivateDto)
], EmpresaTipoSocietarioPrivateDto.prototype, "tipoSocietario", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Define si esta activo',
        type: Boolean
    }),
    __metadata("design:type", Boolean)
], EmpresaTipoSocietarioPrivateDto.prototype, "esActivo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Fecha de cambio del rubro',
        type: String
    }),
    __metadata("design:type", String)
], EmpresaTipoSocietarioPrivateDto.prototype, "fechaCambio", void 0);
//# sourceMappingURL=empresa-tipo-societario-private.dto.js.map