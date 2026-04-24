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
exports.FindAllSolicitudesParamsDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const pagination_params_dto_1 = require("../../../../shared/dto/pagination-params.dto");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class FindAllSolicitudesParamsDto extends pagination_params_dto_1.PaginationParamsDto {
    esAprobado;
    correo;
    orderFecha = "DESC";
    fechaDesde;
    fechaHasta;
}
exports.FindAllSolicitudesParamsDto = FindAllSolicitudesParamsDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Filtrar por estado de solicitud. Valores posibles: `true` = Aprobadas, `false` = Rechazadas, si no se envía se devuelven todas.",
        example: true,
        nullable: true,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Boolean),
    (0, class_validator_1.IsBoolean)({ message: "El parámetro 'esAprobado' debe ser true o false" }),
    __metadata("design:type", Boolean)
], FindAllSolicitudesParamsDto.prototype, "esAprobado", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Filtrar por correo del solicitante. No es obligatorio, pero si se envía debe ser un correo válido.",
        example: "usuario@ejemplo.com",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)({}, { message: "El parámetro 'correo' debe ser un email válido" }),
    __metadata("design:type", String)
], FindAllSolicitudesParamsDto.prototype, "correo", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Ordenar resultados por fecha de solicitud (`fecha`). Valores posibles: 'ASC' o 'DESC'.",
        example: "DESC",
        default: "DESC",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(["ASC", "DESC"], {
        message: "El parámetro 'orderFecha' solo puede ser 'ASC' o 'DESC'",
    }),
    __metadata("design:type", String)
], FindAllSolicitudesParamsDto.prototype, "orderFecha", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Filtrar solicitudes desde esta fecha (incluida). Formato: YYYY-MM-DD.",
        example: "2025-01-01",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], FindAllSolicitudesParamsDto.prototype, "fechaDesde", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: "Filtrar solicitudes hasta esta fecha (incluida). Formato: YYYY-MM-DD.",
        example: "2025-12-31",
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], FindAllSolicitudesParamsDto.prototype, "fechaHasta", void 0);
//# sourceMappingURL=find-all-solicitudes-params.dto.js.map