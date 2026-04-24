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
exports.GetPorcentajesRubroDto = exports.PorcentajeRubro = void 0;
const swagger_1 = require("@nestjs/swagger");
class PorcentajeRubro {
    idRubro;
    nombreRubro;
    totalEmpresas;
    porcentaje;
}
exports.PorcentajeRubro = PorcentajeRubro;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'ID único del rubro',
    }),
    __metadata("design:type", Number)
], PorcentajeRubro.prototype, "idRubro", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Comercio',
        description: 'Nombre del rubro',
    }),
    __metadata("design:type", String)
], PorcentajeRubro.prototype, "nombreRubro", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 25,
        description: 'Cantidad total de empresas que pertenecen a este rubro',
    }),
    __metadata("design:type", Number)
], PorcentajeRubro.prototype, "totalEmpresas", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 12.5,
        description: 'Porcentaje de empresas que pertenecen a este rubro respecto al total',
    }),
    __metadata("design:type", Number)
], PorcentajeRubro.prototype, "porcentaje", void 0);
class GetPorcentajesRubroDto {
    rubros;
}
exports.GetPorcentajesRubroDto = GetPorcentajesRubroDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        type: [PorcentajeRubro],
        description: 'Lista de rubros con sus estadísticas de participación',
    }),
    __metadata("design:type", Array)
], GetPorcentajesRubroDto.prototype, "rubros", void 0);
//# sourceMappingURL=get-porcentajes-rubro.dto.js.map