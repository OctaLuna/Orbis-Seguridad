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
exports.OdsDt = void 0;
const typeorm_1 = require("typeorm");
const empresa_dt_entity_1 = require("./empresa-dt.entity");
const proyecto_dt_enity_1 = require("./proyecto-dt.enity");
let OdsDt = class OdsDt {
    id;
    nombre;
    idEmpresa;
    empresa;
    proyectos;
};
exports.OdsDt = OdsDt;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_ods' }),
    __metadata("design:type", Number)
], OdsDt.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nombre_ods', type: 'text' }),
    __metadata("design:type", String)
], OdsDt.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'empresas_dt_id', type: 'int' }),
    __metadata("design:type", Number)
], OdsDt.prototype, "idEmpresa", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => empresa_dt_entity_1.EmpresaDt, (empresaDt) => empresaDt.municipios),
    (0, typeorm_1.JoinColumn)({ name: 'empresas_dt_id' }),
    __metadata("design:type", empresa_dt_entity_1.EmpresaDt)
], OdsDt.prototype, "empresa", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => proyecto_dt_enity_1.ProyectoDt, (proyectoDt) => proyectoDt.ods),
    __metadata("design:type", Array)
], OdsDt.prototype, "proyectos", void 0);
exports.OdsDt = OdsDt = __decorate([
    (0, typeorm_1.Entity)('ods_dt')
], OdsDt);
//# sourceMappingURL=ods-dt.entity.js.map