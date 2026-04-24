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
exports.ImplementacionAccion = void 0;
const implementacion_entity_1 = require("../../../../../entities/implementacion.entity");
const typeorm_1 = require("typeorm");
const accion_entity_1 = require("../../../entities/accion.entity");
const proyecto_entity_1 = require("../../proyectos/entities/proyecto.entity");
let ImplementacionAccion = class ImplementacionAccion {
    id;
    idAccion;
    idImplementacion;
    implementacion;
    accion;
    proyectos;
};
exports.ImplementacionAccion = ImplementacionAccion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_implementacion_accion' }),
    __metadata("design:type", Number)
], ImplementacionAccion.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'id_accion' }),
    __metadata("design:type", Number)
], ImplementacionAccion.prototype, "idAccion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'id_implementacion' }),
    __metadata("design:type", Number)
], ImplementacionAccion.prototype, "idImplementacion", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => implementacion_entity_1.Implementacion, (imple) => imple.implementacionesAcciones),
    (0, typeorm_1.JoinColumn)({ name: 'id_implementacion' }),
    __metadata("design:type", implementacion_entity_1.Implementacion)
], ImplementacionAccion.prototype, "implementacion", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => accion_entity_1.Accion, (accion) => accion.implementacionesAcciones),
    (0, typeorm_1.JoinColumn)({ name: 'id_accion' }),
    __metadata("design:type", accion_entity_1.Accion)
], ImplementacionAccion.prototype, "accion", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => proyecto_entity_1.Proyecto, (proy) => proy.implementacionAccion),
    __metadata("design:type", Array)
], ImplementacionAccion.prototype, "proyectos", void 0);
exports.ImplementacionAccion = ImplementacionAccion = __decorate([
    (0, typeorm_1.Entity)('implementaciones_acciones')
], ImplementacionAccion);
//# sourceMappingURL=implementacion-accion.entity.js.map