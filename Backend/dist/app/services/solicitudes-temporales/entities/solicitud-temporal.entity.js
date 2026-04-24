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
exports.SolicitudTemporal = void 0;
const typeorm_1 = require("typeorm");
let SolicitudTemporal = class SolicitudTemporal {
    id;
    correo;
    justificacion;
    esAprobado;
    fechaUso;
    fecha;
};
exports.SolicitudTemporal = SolicitudTemporal;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_solicitud', type: 'bigint' }),
    __metadata("design:type", Number)
], SolicitudTemporal.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'correo', type: 'varchar', length: 100 }),
    __metadata("design:type", String)
], SolicitudTemporal.prototype, "correo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'justificacion', type: 'text' }),
    __metadata("design:type", String)
], SolicitudTemporal.prototype, "justificacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'es_aprobado', type: 'boolean', nullable: true, default: null }),
    __metadata("design:type", Object)
], SolicitudTemporal.prototype, "esAprobado", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_uso', type: 'timestamp' }),
    __metadata("design:type", Date)
], SolicitudTemporal.prototype, "fechaUso", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'fecha', type: 'timestamp' }),
    __metadata("design:type", Date)
], SolicitudTemporal.prototype, "fecha", void 0);
exports.SolicitudTemporal = SolicitudTemporal = __decorate([
    (0, typeorm_1.Entity)('solicitudes_temporales')
], SolicitudTemporal);
//# sourceMappingURL=solicitud-temporal.entity.js.map