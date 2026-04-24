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
exports.Pais = void 0;
const typeorm_1 = require("typeorm");
const operacion_internacional_entity_1 = require("../../operaciones-internacionales/entities/operacion-internacional.entity");
const empresa_entity_1 = require("../../../entities/empresa.entity");
let Pais = class Pais {
    id;
    nombre;
    operacionesInternacionales;
    empresas;
};
exports.Pais = Pais;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_pais' }),
    __metadata("design:type", Number)
], Pais.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nombre' }),
    __metadata("design:type", String)
], Pais.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => operacion_internacional_entity_1.OperacionInternacional, (opeInter) => opeInter.pais),
    __metadata("design:type", Array)
], Pais.prototype, "operacionesInternacionales", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => empresa_entity_1.Empresa, (empresa) => empresa.paisesOperaInteranacionalmente),
    __metadata("design:type", Array)
], Pais.prototype, "empresas", void 0);
exports.Pais = Pais = __decorate([
    (0, typeorm_1.Entity)('paises')
], Pais);
//# sourceMappingURL=pais.entity.js.map