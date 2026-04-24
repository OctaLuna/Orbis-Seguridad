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
exports.OdsDtDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const proyecto_dt_dto_1 = require("./proyecto-dt.dto");
class OdsDtDto {
    id;
    nombre;
    proyectos;
}
exports.OdsDtDto = OdsDtDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Identificador único del ODS',
        type: Number
    }),
    __metadata("design:type", Number)
], OdsDtDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nombre del Objetivo de Desarrollo Sostenible',
        type: String
    }),
    __metadata("design:type", String)
], OdsDtDto.prototype, "nombre", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Lista de proyectos asociados a este ODS',
        type: [proyecto_dt_dto_1.ProyectoDtDto],
    }),
    __metadata("design:type", Array)
], OdsDtDto.prototype, "proyectos", void 0);
//# sourceMappingURL=ods-dt.dto.js.map