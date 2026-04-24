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
exports.Rubro = void 0;
const typeorm_1 = require("typeorm");
const rubro_empresa_entity_1 = require("../modules/rubros-empresas/entities/rubro-empresa.entity");
let Rubro = class Rubro {
    id;
    nombre;
    esPropio;
    rubroEmpresas;
};
exports.Rubro = Rubro;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_rubro' }),
    __metadata("design:type", Number)
], Rubro.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, name: 'nombre_rubro' }),
    __metadata("design:type", String)
], Rubro.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', name: 'es_propio', default: false }),
    __metadata("design:type", Boolean)
], Rubro.prototype, "esPropio", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => rubro_empresa_entity_1.RubroEmpresa, (rubroEmpresa) => rubroEmpresa.rubro),
    __metadata("design:type", Array)
], Rubro.prototype, "rubroEmpresas", void 0);
exports.Rubro = Rubro = __decorate([
    (0, typeorm_1.Entity)('rubros')
], Rubro);
//# sourceMappingURL=rubro.entity.js.map