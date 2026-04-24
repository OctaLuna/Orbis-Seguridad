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
exports.Sede = void 0;
const empresa_entity_1 = require("../../../entities/empresa.entity");
const typeorm_1 = require("typeorm");
const departamento_entity_1 = require("../../departamentos/entities/departamento.entity");
let Sede = class Sede {
    id;
    idDepartamento;
    idEmpresa;
    esCentral;
    empresa;
    departamento;
};
exports.Sede = Sede;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_ubicacion' }),
    __metadata("design:type", Number)
], Sede.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'id_departamento' }),
    __metadata("design:type", Number)
], Sede.prototype, "idDepartamento", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'id_empresa' }),
    __metadata("design:type", Number)
], Sede.prototype, "idEmpresa", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', name: 'es_central', default: false }),
    __metadata("design:type", Boolean)
], Sede.prototype, "esCentral", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => empresa_entity_1.Empresa, (empresa) => empresa.sedes),
    (0, typeorm_1.JoinColumn)({ name: 'id_empresa' }),
    __metadata("design:type", empresa_entity_1.Empresa)
], Sede.prototype, "empresa", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => departamento_entity_1.Departamento, (depa) => depa.sedes),
    (0, typeorm_1.JoinColumn)({ name: 'id_departamento' }),
    __metadata("design:type", departamento_entity_1.Departamento)
], Sede.prototype, "departamento", void 0);
exports.Sede = Sede = __decorate([
    (0, typeorm_1.Entity)('sedes')
], Sede);
//# sourceMappingURL=sede.entity.js.map