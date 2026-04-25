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
exports.InvestigadorEmpresa = void 0;
const typeorm_1 = require("typeorm");
const usuario_entity_1 = require("./usuario.entity");
let InvestigadorEmpresa = class InvestigadorEmpresa {
    id;
    idUsuario;
    idEmpresa;
    asignadoPor;
    createdAt;
    usuario;
};
exports.InvestigadorEmpresa = InvestigadorEmpresa;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], InvestigadorEmpresa.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_usuario' }),
    __metadata("design:type", Number)
], InvestigadorEmpresa.prototype, "idUsuario", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_empresa' }),
    __metadata("design:type", Number)
], InvestigadorEmpresa.prototype, "idEmpresa", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'asignado_por', nullable: true }),
    __metadata("design:type", Number)
], InvestigadorEmpresa.prototype, "asignadoPor", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], InvestigadorEmpresa.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => usuario_entity_1.Usuario, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'id_usuario' }),
    __metadata("design:type", usuario_entity_1.Usuario)
], InvestigadorEmpresa.prototype, "usuario", void 0);
exports.InvestigadorEmpresa = InvestigadorEmpresa = __decorate([
    (0, typeorm_1.Entity)('investigador_empresa'),
    (0, typeorm_1.Unique)(['idUsuario', 'idEmpresa'])
], InvestigadorEmpresa);
//# sourceMappingURL=investigador-empresa.entity.js.map