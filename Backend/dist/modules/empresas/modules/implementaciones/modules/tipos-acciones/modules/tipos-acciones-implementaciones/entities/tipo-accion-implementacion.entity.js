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
exports.TipoAccionImplementacion = void 0;
const implementacion_entity_1 = require("../../../../../entities/implementacion.entity");
const typeorm_1 = require("typeorm");
const tipo_accion_entity_1 = require("../../../entities/tipo-accion.entity");
let TipoAccionImplementacion = class TipoAccionImplementacion {
    id;
    idTipoAccion;
    idImplementacion;
    implementacion;
    tipoAccion;
};
exports.TipoAccionImplementacion = TipoAccionImplementacion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_tipo_accion_implementacion' }),
    __metadata("design:type", Number)
], TipoAccionImplementacion.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'id_tipo_accion' }),
    __metadata("design:type", Number)
], TipoAccionImplementacion.prototype, "idTipoAccion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'id_implementacion' }),
    __metadata("design:type", Number)
], TipoAccionImplementacion.prototype, "idImplementacion", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => implementacion_entity_1.Implementacion, (imple) => imple.tiposAccionesImplementaciones),
    (0, typeorm_1.JoinColumn)({ name: 'id_implementacion' }),
    __metadata("design:type", implementacion_entity_1.Implementacion)
], TipoAccionImplementacion.prototype, "implementacion", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tipo_accion_entity_1.TipoAccion, (tipoAccion) => tipoAccion.tiposAccionesImplementaciones),
    (0, typeorm_1.JoinColumn)({ name: 'id_tipo_accion' }),
    __metadata("design:type", tipo_accion_entity_1.TipoAccion)
], TipoAccionImplementacion.prototype, "tipoAccion", void 0);
exports.TipoAccionImplementacion = TipoAccionImplementacion = __decorate([
    (0, typeorm_1.Entity)('tipos_acciones_implementaciones')
], TipoAccionImplementacion);
//# sourceMappingURL=tipo-accion-implementacion.entity.js.map