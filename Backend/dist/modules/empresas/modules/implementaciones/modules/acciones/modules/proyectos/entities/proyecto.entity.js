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
exports.Proyecto = void 0;
const typeorm_1 = require("typeorm");
const implementacion_accion_entity_1 = require("../../implementaciones-acciones/entities/implementacion-accion.entity");
let Proyecto = class Proyecto {
    id;
    nombre;
    idImplementacionAccion;
    implementacionAccion;
};
exports.Proyecto = Proyecto;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_proyecto' }),
    __metadata("design:type", Number)
], Proyecto.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 300, name: 'nombre' }),
    __metadata("design:type", String)
], Proyecto.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'id_implementacion_accion' }),
    __metadata("design:type", Number)
], Proyecto.prototype, "idImplementacionAccion", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => implementacion_accion_entity_1.ImplementacionAccion, (impleAcc) => impleAcc.proyectos),
    (0, typeorm_1.JoinColumn)({ name: 'id_implementacion_accion' }),
    __metadata("design:type", implementacion_accion_entity_1.ImplementacionAccion)
], Proyecto.prototype, "implementacionAccion", void 0);
exports.Proyecto = Proyecto = __decorate([
    (0, typeorm_1.Entity)('proyectos')
], Proyecto);
//# sourceMappingURL=proyecto.entity.js.map