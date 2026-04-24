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
exports.RegisterImplementacionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const register_acciones_dto_1 = require("./register-acciones.dto");
class RegisterImplementacionDto {
    tiposAccion;
    anio;
    acciones;
}
exports.RegisterImplementacionDto = RegisterImplementacionDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Tipo de accion seleccionados,max 2',
        type: [Number],
        example: [1, 2]
    }),
    __metadata("design:type", Array)
], RegisterImplementacionDto.prototype, "tiposAccion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Anio de implementacion de estas acciones',
        type: Number
    }),
    __metadata("design:type", Number)
], RegisterImplementacionDto.prototype, "anio", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Acciones realizadas',
        type: [register_acciones_dto_1.RegisterAccion]
    }),
    __metadata("design:type", Array)
], RegisterImplementacionDto.prototype, "acciones", void 0);
//# sourceMappingURL=register-implementacion.dto.js.map