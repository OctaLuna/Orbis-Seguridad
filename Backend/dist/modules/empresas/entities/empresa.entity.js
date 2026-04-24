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
exports.Empresa = void 0;
const typeorm_1 = require("typeorm");
const sede_entity_1 = require("../modules/sedes/entities/sede.entity");
const familia_entity_1 = require("../modules/familias/entities/familia.entity");
const fundador_entity_1 = require("../modules/fundadores/entities/fundador.entity");
const hito_entity_1 = require("../modules/hitos/entities/hito.entity");
const imagen_entity_1 = require("../modules/imagenes/entities/imagen.entity");
const implementacion_entity_1 = require("../modules/implementaciones/entities/implementacion.entity");
const item_entity_1 = require("../modules/items/entities/item.entity");
const municipio_empresa_entity_1 = require("../modules/municipios/modules/municipios-empresa/entities/municipio-empresa.entity");
const municipio_entity_1 = require("../modules/municipios/entities/municipio.entity");
const operacion_internacional_entity_1 = require("../modules/operaciones-internacionales/entities/operacion-internacional.entity");
const premio_entity_1 = require("../modules/premios/entities/premio.entity");
const rubro_empresa_entity_1 = require("../modules/rubros/modules/rubros-empresas/entities/rubro-empresa.entity");
const servicio_entity_1 = require("../modules/servicios/entities/servicio.entity");
const tamanio_empresa_entity_1 = require("../modules/tamanios-empresas/entities/tamanio-empresa.entity");
const empresa_tipo_societario_entity_1 = require("../modules/tipos-societarios/modules/empresas-tipos-societarios/entities/empresa-tipo-societario.entity");
const pais_entity_1 = require("../modules/paises/entities/pais.entity");
let Empresa = class Empresa {
    id;
    nombreComercial;
    fechaFundacion;
    vision;
    mision;
    direccionWeb;
    actividad;
    idTamanio;
    mensaje;
    sedes;
    familias;
    fundadores;
    hitos;
    imagenes;
    implementacion;
    items;
    municipiosEmpresas;
    municipios;
    operacionesInternacionales;
    paisesOperaInteranacionalmente;
    premios;
    rubrosEmpresa;
    servicios;
    tamanioEmpresa;
    tiposSocietariosEmpresa;
};
exports.Empresa = Empresa;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_empresa' }),
    __metadata("design:type", Number)
], Empresa.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'varchar', length: 100, name: 'nombre_comercial' }),
    __metadata("design:type", String)
], Empresa.prototype, "nombreComercial", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'date', name: 'fecha_fundacion' }),
    __metadata("design:type", String)
], Empresa.prototype, "fechaFundacion", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', name: 'vision' }),
    __metadata("design:type", String)
], Empresa.prototype, "vision", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', name: 'mision' }),
    __metadata("design:type", String)
], Empresa.prototype, "mision", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', name: 'direccion_web' }),
    __metadata("design:type", String)
], Empresa.prototype, "direccionWeb", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'actividad' }),
    __metadata("design:type", String)
], Empresa.prototype, "actividad", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', name: 'id_tamanio' }),
    __metadata("design:type", Number)
], Empresa.prototype, "idTamanio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', name: 'mensaje' }),
    __metadata("design:type", String)
], Empresa.prototype, "mensaje", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => sede_entity_1.Sede, (sede) => sede.empresa),
    __metadata("design:type", Array)
], Empresa.prototype, "sedes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => familia_entity_1.Familia, (familia) => familia.empresa),
    __metadata("design:type", Array)
], Empresa.prototype, "familias", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => fundador_entity_1.Fundador, (fundador) => fundador.empresa),
    __metadata("design:type", Array)
], Empresa.prototype, "fundadores", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => hito_entity_1.Hito, (hito) => hito.empresa),
    __metadata("design:type", Array)
], Empresa.prototype, "hitos", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => imagen_entity_1.Imagen, (imagen) => imagen.empresa),
    __metadata("design:type", Array)
], Empresa.prototype, "imagenes", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => implementacion_entity_1.Implementacion, (imple) => imple.empresa),
    __metadata("design:type", implementacion_entity_1.Implementacion)
], Empresa.prototype, "implementacion", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => item_entity_1.Item, (item) => item.empresa),
    __metadata("design:type", Array)
], Empresa.prototype, "items", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => municipio_empresa_entity_1.MunicipioEmpresa, (muniEmpre) => muniEmpre.empresa),
    __metadata("design:type", Array)
], Empresa.prototype, "municipiosEmpresas", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => municipio_entity_1.Municipio, (municipio) => municipio.empresas),
    (0, typeorm_1.JoinTable)({
        name: 'municipios_empresas',
        joinColumn: { name: 'id_empresa' },
        inverseJoinColumn: { name: 'id_municipio' }
    }),
    __metadata("design:type", Array)
], Empresa.prototype, "municipios", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => operacion_internacional_entity_1.OperacionInternacional, (operacionInternacional) => operacionInternacional.empresa),
    __metadata("design:type", Array)
], Empresa.prototype, "operacionesInternacionales", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => pais_entity_1.Pais, (pais) => pais.empresas),
    (0, typeorm_1.JoinTable)({
        name: 'operaciones_internacionales',
        joinColumn: { name: 'id_empresa' },
        inverseJoinColumn: { name: 'id_pais' }
    }),
    __metadata("design:type", Array)
], Empresa.prototype, "paisesOperaInteranacionalmente", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => premio_entity_1.Premio, (premio) => premio.empresa),
    __metadata("design:type", Array)
], Empresa.prototype, "premios", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => rubro_empresa_entity_1.RubroEmpresa, (rubroEmpresa) => rubroEmpresa.empresa),
    __metadata("design:type", Array)
], Empresa.prototype, "rubrosEmpresa", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => servicio_entity_1.Servicio, (servicio) => servicio.empresa),
    __metadata("design:type", Array)
], Empresa.prototype, "servicios", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => tamanio_empresa_entity_1.TamanioEmpresa, (tam) => tam.empresas),
    (0, typeorm_1.JoinColumn)({ name: 'id_tamanio' }),
    __metadata("design:type", tamanio_empresa_entity_1.TamanioEmpresa)
], Empresa.prototype, "tamanioEmpresa", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => empresa_tipo_societario_entity_1.EmpresaTipoSocietario, (empre) => empre.empresa),
    __metadata("design:type", Array)
], Empresa.prototype, "tiposSocietariosEmpresa", void 0);
exports.Empresa = Empresa = __decorate([
    (0, typeorm_1.Entity)('empresas')
], Empresa);
//# sourceMappingURL=empresa.entity.js.map