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
exports.Familia = void 0;
const empresa_entity_1 = require("../../../entities/empresa.entity");
const typeorm_1 = require("typeorm");
let Familia = class Familia {
    id;
    idEmpresa;
    esFamiliar;
    anio;
    empresa;
};
exports.Familia = Familia;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_familia' }),
    __metadata("design:type", Number)
], Familia.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'id_empresa' }),
    __metadata("design:type", Number)
], Familia.prototype, "idEmpresa", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', name: 'es_familiar' }),
    __metadata("design:type", Boolean)
], Familia.prototype, "esFamiliar", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'anio' }),
    __metadata("design:type", Number)
], Familia.prototype, "anio", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => empresa_entity_1.Empresa, (empresa) => empresa.familias),
    (0, typeorm_1.JoinColumn)({ name: 'id_empresa' }),
    __metadata("design:type", empresa_entity_1.Empresa)
], Familia.prototype, "empresa", void 0);
exports.Familia = Familia = __decorate([
    (0, typeorm_1.Entity)('familias')
], Familia);
//# sourceMappingURL=familia.entity.js.map