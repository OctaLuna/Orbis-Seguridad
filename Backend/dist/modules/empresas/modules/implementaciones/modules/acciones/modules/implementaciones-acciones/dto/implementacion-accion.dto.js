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
exports.ImplementacionAccionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const accion_dto_1 = require("../../../dto/accion.dto");
const proyecto_dto_1 = require("../../proyectos/dto/proyecto.dto");
class ImplementacionAccionDto {
    id;
    accion;
    proyectos;
}
exports.ImplementacionAccionDto = ImplementacionAccionDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Id de la accion implentada',
        type: Number
    }),
    __metadata("design:type", Number)
], ImplementacionAccionDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Implemantacion de acciones',
        type: accion_dto_1.AccionDto
    }),
    __metadata("design:type", accion_dto_1.AccionDto)
], ImplementacionAccionDto.prototype, "accion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Proyectos relacionados a la accion',
        type: [proyecto_dto_1.ProyectoDto]
    }),
    __metadata("design:type", Array)
], ImplementacionAccionDto.prototype, "proyectos", void 0);
//# sourceMappingURL=implementacion-accion.dto.js.map