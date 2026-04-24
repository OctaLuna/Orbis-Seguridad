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
exports.RubroEmpresa = void 0;
const empresa_entity_1 = require("../../../../../entities/empresa.entity");
const typeorm_1 = require("typeorm");
const rubro_entity_1 = require("../../../entities/rubro.entity");
let RubroEmpresa = class RubroEmpresa {
    id;
    idRubro;
    idEmpresa;
    esActivo;
    empresa;
    rubro;
};
exports.RubroEmpresa = RubroEmpresa;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_rubro_empresa' }),
    __metadata("design:type", Number)
], RubroEmpresa.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'id_rubro' }),
    __metadata("design:type", Number)
], RubroEmpresa.prototype, "idRubro", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'id_empresa' }),
    __metadata("design:type", Number)
], RubroEmpresa.prototype, "idEmpresa", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', name: 'es_activo', default: true }),
    __metadata("design:type", Boolean)
], RubroEmpresa.prototype, "esActivo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => empresa_entity_1.Empresa, (empresa) => empresa.rubrosEmpresa),
    (0, typeorm_1.JoinColumn)({ name: 'id_empresa' }),
    __metadata("design:type", empresa_entity_1.Empresa)
], RubroEmpresa.prototype, "empresa", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => rubro_entity_1.Rubro, (rubro) => rubro.rubroEmpresas),
    (0, typeorm_1.JoinColumn)({ name: 'id_rubro' }),
    __metadata("design:type", rubro_entity_1.Rubro)
], RubroEmpresa.prototype, "rubro", void 0);
exports.RubroEmpresa = RubroEmpresa = __decorate([
    (0, typeorm_1.Entity)('rubros_empresas')
], RubroEmpresa);
//# sourceMappingURL=rubro-empresa.entity.js.map