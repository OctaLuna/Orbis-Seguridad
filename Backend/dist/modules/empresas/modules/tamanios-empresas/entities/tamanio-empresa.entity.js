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
exports.TamanioEmpresa = void 0;
const empresa_entity_1 = require("../../../entities/empresa.entity");
const typeorm_1 = require("typeorm");
let TamanioEmpresa = class TamanioEmpresa {
    id;
    nombre;
    empresas;
};
exports.TamanioEmpresa = TamanioEmpresa;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_tamanio' }),
    __metadata("design:type", Number)
], TamanioEmpresa.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, name: 'nombre_tamanio' }),
    __metadata("design:type", String)
], TamanioEmpresa.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => empresa_entity_1.Empresa, (empresa) => empresa.tamanioEmpresa),
    __metadata("design:type", Array)
], TamanioEmpresa.prototype, "empresas", void 0);
exports.TamanioEmpresa = TamanioEmpresa = __decorate([
    (0, typeorm_1.Entity)('tamanios_empresas')
], TamanioEmpresa);
//# sourceMappingURL=tamanio-empresa.entity.js.map