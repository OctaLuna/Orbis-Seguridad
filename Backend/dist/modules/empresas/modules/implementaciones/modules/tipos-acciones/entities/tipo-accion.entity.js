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
exports.TipoAccion = void 0;
const typeorm_1 = require("typeorm");
const tipo_accion_implementacion_entity_1 = require("../modules/tipos-acciones-implementaciones/entities/tipo-accion-implementacion.entity");
const implementacion_entity_1 = require("../../../entities/implementacion.entity");
let TipoAccion = class TipoAccion {
    id;
    nombre;
    tiposAccionesImplementaciones;
    implementaciones;
};
exports.TipoAccion = TipoAccion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_tipo_accion' }),
    __metadata("design:type", Number)
], TipoAccion.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, name: 'nombre' }),
    __metadata("design:type", String)
], TipoAccion.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => tipo_accion_implementacion_entity_1.TipoAccionImplementacion, (tipoAccionImplementacion) => tipoAccionImplementacion.tipoAccion),
    __metadata("design:type", Array)
], TipoAccion.prototype, "tiposAccionesImplementaciones", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => implementacion_entity_1.Implementacion, (imple) => imple.tiposAcciones),
    __metadata("design:type", Array)
], TipoAccion.prototype, "implementaciones", void 0);
exports.TipoAccion = TipoAccion = __decorate([
    (0, typeorm_1.Entity)('tipos_acciones')
], TipoAccion);
//# sourceMappingURL=tipo-accion.entity.js.map