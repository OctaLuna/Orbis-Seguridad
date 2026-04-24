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
exports.TipoSocietario = void 0;
const typeorm_1 = require("typeorm");
const empresa_tipo_societario_entity_1 = require("../modules/empresas-tipos-societarios/entities/empresa-tipo-societario.entity");
let TipoSocietario = class TipoSocietario {
    id;
    nombre;
    esPropio;
    tiposSocietariosEmpresa;
};
exports.TipoSocietario = TipoSocietario;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_tipsoc' }),
    __metadata("design:type", Number)
], TipoSocietario.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 50, name: 'nombre_tipsoc' }),
    __metadata("design:type", String)
], TipoSocietario.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'boolean', name: 'es_propio', default: false }),
    __metadata("design:type", Boolean)
], TipoSocietario.prototype, "esPropio", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => empresa_tipo_societario_entity_1.EmpresaTipoSocietario, (empre) => empre.tipoSocietario),
    __metadata("design:type", Array)
], TipoSocietario.prototype, "tiposSocietariosEmpresa", void 0);
exports.TipoSocietario = TipoSocietario = __decorate([
    (0, typeorm_1.Entity)('tipos_societarios')
], TipoSocietario);
//# sourceMappingURL=tipo-societario.entity.js.map