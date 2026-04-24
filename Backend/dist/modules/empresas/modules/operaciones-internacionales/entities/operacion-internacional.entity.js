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
exports.OperacionInternacional = void 0;
const empresa_entity_1 = require("../../../entities/empresa.entity");
const typeorm_1 = require("typeorm");
const pais_entity_1 = require("../../paises/entities/pais.entity");
let OperacionInternacional = class OperacionInternacional {
    id;
    idPais;
    idEmpresa;
    url;
    empresa;
    pais;
};
exports.OperacionInternacional = OperacionInternacional;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_operacion' }),
    __metadata("design:type", Number)
], OperacionInternacional.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_pais', type: 'int' }),
    __metadata("design:type", Number)
], OperacionInternacional.prototype, "idPais", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'id_empresa' }),
    __metadata("design:type", Number)
], OperacionInternacional.prototype, "idEmpresa", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 200, name: 'url', nullable: true }),
    __metadata("design:type", String)
], OperacionInternacional.prototype, "url", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => empresa_entity_1.Empresa, (empresa) => empresa.operacionesInternacionales),
    (0, typeorm_1.JoinColumn)({ name: 'id_empresa' }),
    __metadata("design:type", empresa_entity_1.Empresa)
], OperacionInternacional.prototype, "empresa", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => pais_entity_1.Pais, (pais) => pais.operacionesInternacionales),
    (0, typeorm_1.JoinColumn)({ name: 'id_pais' }),
    __metadata("design:type", pais_entity_1.Pais)
], OperacionInternacional.prototype, "pais", void 0);
exports.OperacionInternacional = OperacionInternacional = __decorate([
    (0, typeorm_1.Entity)('operaciones_internacionales')
], OperacionInternacional);
//# sourceMappingURL=operacion-internacional.entity.js.map