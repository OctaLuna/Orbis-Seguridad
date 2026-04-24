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
exports.Hito = void 0;
const empresa_entity_1 = require("../../../entities/empresa.entity");
const typeorm_1 = require("typeorm");
let Hito = class Hito {
    id;
    idEmpresa;
    descripcion;
    fecha;
    nombre;
    empresa;
};
exports.Hito = Hito;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_hito' }),
    __metadata("design:type", Number)
], Hito.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'id_empresa' }),
    __metadata("design:type", Number)
], Hito.prototype, "idEmpresa", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', name: 'descripcion' }),
    __metadata("design:type", String)
], Hito.prototype, "descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', name: 'fecha_h' }),
    __metadata("design:type", String)
], Hito.prototype, "fecha", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 300, name: 'nombre' }),
    __metadata("design:type", String)
], Hito.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => empresa_entity_1.Empresa, (empresa => empresa.hitos)),
    (0, typeorm_1.JoinColumn)({ name: 'id_empresa' }),
    __metadata("design:type", empresa_entity_1.Empresa)
], Hito.prototype, "empresa", void 0);
exports.Hito = Hito = __decorate([
    (0, typeorm_1.Entity)('hitos')
], Hito);
//# sourceMappingURL=hito.entity.js.map