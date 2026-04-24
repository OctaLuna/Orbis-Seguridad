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
exports.ImplementacionPrivateDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const implementacion_accion_dto_1 = require("../modules/acciones/modules/implementaciones-acciones/dto/implementacion-accion.dto");
const tipo_accion_dto_1 = require("../modules/tipos-acciones/dto/tipo-accion.dto");
class ImplementacionPrivateDto {
    id;
    anio;
    implementacionesAcciones;
    tiposAcciones;
}
exports.ImplementacionPrivateDto = ImplementacionPrivateDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Id de la implemantacion de la empresas',
        type: Number
    }),
    __metadata("design:type", Number)
], ImplementacionPrivateDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Anio de implementacion',
        type: Number
    }),
    __metadata("design:type", Number)
], ImplementacionPrivateDto.prototype, "anio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Implemantaciones de acciones',
        type: [implementacion_accion_dto_1.ImplementacionAccionDto]
    }),
    __metadata("design:type", implementacion_accion_dto_1.ImplementacionAccionDto)
], ImplementacionPrivateDto.prototype, "implementacionesAcciones", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tipos de acciones relacionada',
        type: [tipo_accion_dto_1.TipoAccionDto]
    }),
    __metadata("design:type", Array)
], ImplementacionPrivateDto.prototype, "tiposAcciones", void 0);
//# sourceMappingURL=implementacion-private.dto.js.map