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
exports.SolicitudTemporalDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class SolicitudTemporalDto {
    id;
    correo;
    justificacion;
    esAprobado;
    fechaUso;
    fecha;
}
exports.SolicitudTemporalDto = SolicitudTemporalDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 1,
        description: 'Identificador único de la solicitud temporal',
    }),
    __metadata("design:type", Number)
], SolicitudTemporalDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'usuario@correo.com',
        description: 'Correo electrónico asociado a la solicitud',
    }),
    __metadata("design:type", String)
], SolicitudTemporalDto.prototype, "correo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Necesito acceso temporal a la oficina para revisión de documentos',
        description: 'Justificación de la solicitud temporal',
    }),
    __metadata("design:type", String)
], SolicitudTemporalDto.prototype, "justificacion", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: true,
        nullable: true,
        description: 'Estado de aprobación de la solicitud: `true` (aprobada), `false` (rechazada), `null` (pendiente)',
    }),
    __metadata("design:type", Object)
], SolicitudTemporalDto.prototype, "esAprobado", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2025-09-20T18:00:00.000Z',
        description: 'Fecha hasta donde se solicita el permiso temporal (fecha de uso)',
    }),
    __metadata("design:type", Date)
], SolicitudTemporalDto.prototype, "fechaUso", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2025-09-17T12:30:00.000Z',
        description: 'Fecha en que se registró la solicitud',
    }),
    __metadata("design:type", Date)
], SolicitudTemporalDto.prototype, "fecha", void 0);
//# sourceMappingURL=solicitud-temporal.dto.js.map