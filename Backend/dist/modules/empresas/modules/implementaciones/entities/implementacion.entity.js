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
exports.Implementacion = void 0;
const empresa_entity_1 = require("../../../entities/empresa.entity");
const typeorm_1 = require("typeorm");
const implementacion_accion_entity_1 = require("../modules/acciones/modules/implementaciones-acciones/entities/implementacion-accion.entity");
const tipo_accion_implementacion_entity_1 = require("../modules/tipos-acciones/modules/tipos-acciones-implementaciones/entities/tipo-accion-implementacion.entity");
const tipo_accion_entity_1 = require("../modules/tipos-acciones/entities/tipo-accion.entity");
let Implementacion = class Implementacion {
    id;
    anio;
    idEmpresa;
    empresa;
    implementacionesAcciones;
    tiposAccionesImplementaciones;
    tiposAcciones;
};
exports.Implementacion = Implementacion;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_implementacion' }),
    __metadata("design:type", Number)
], Implementacion.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'anio' }),
    __metadata("design:type", Number)
], Implementacion.prototype, "anio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'id_empresa' }),
    __metadata("design:type", Number)
], Implementacion.prototype, "idEmpresa", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => empresa_entity_1.Empresa, (empresa) => empresa.implementacion),
    (0, typeorm_1.JoinColumn)({ name: 'id_empresa' }),
    __metadata("design:type", empresa_entity_1.Empresa)
], Implementacion.prototype, "empresa", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => implementacion_accion_entity_1.ImplementacionAccion, (impleAcc) => impleAcc.implementacion),
    __metadata("design:type", Array)
], Implementacion.prototype, "implementacionesAcciones", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => tipo_accion_implementacion_entity_1.TipoAccionImplementacion, (tiAccImple) => tiAccImple.implementacion),
    __metadata("design:type", Array)
], Implementacion.prototype, "tiposAccionesImplementaciones", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => tipo_accion_entity_1.TipoAccion, (tipoAccion) => tipoAccion.implementaciones),
    (0, typeorm_1.JoinTable)({
        name: 'tipos_acciones_implementaciones',
        joinColumn: { name: 'id_implementacion' },
        inverseJoinColumn: { name: 'id_tipo_accion' }
    }),
    __metadata("design:type", Array)
], Implementacion.prototype, "tiposAcciones", void 0);
exports.Implementacion = Implementacion = __decorate([
    (0, typeorm_1.Entity)('implementaciones')
], Implementacion);
//# sourceMappingURL=implementacion.entity.js.map