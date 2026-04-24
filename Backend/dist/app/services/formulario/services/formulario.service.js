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
exports.FormularioService = void 0;
const common_1 = require("@nestjs/common");
const tamanios_empresas_service_1 = require("../../../../modules/empresas/modules/tamanios-empresas/services/tamanios-empresas.service");
const typeorm_1 = require("typeorm");
const empresas_service_1 = require("../../../../modules/empresas/services/empresas.service");
const fundadores_service_1 = require("../../../../modules/empresas/modules/fundadores/services/fundadores.service");
const imagenes_service_1 = require("../../../../modules/empresas/modules/imagenes/services/imagenes.service");
const servicios_service_1 = require("../../../../modules/empresas/modules/servicios/services/servicios.service");
const familias_service_1 = require("../../../../modules/empresas/modules/familias/services/familias.service");
const rubros_empresas_service_1 = require("../../../../modules/empresas/modules/rubros/modules/rubros-empresas/services/rubros-empresas.service");
const items_service_1 = require("../../../../modules/empresas/modules/items/services/items.service");
const empresas_tipos_societarios_service_1 = require("../../../../modules/empresas/modules/tipos-societarios/modules/empresas-tipos-societarios/services/empresas-tipos-societarios.service");
const sedes_service_1 = require("../../../../modules/empresas/modules/sedes/services/sedes.service");
const municipios_empresa_service_1 = require("../../../../modules/empresas/modules/municipios/modules/municipios-empresa/services/municipios-empresa.service");
const operaciones_internacionales_service_1 = require("../../../../modules/empresas/modules/operaciones-internacionales/services/operaciones-internacionales.service");
const premios_service_1 = require("../../../../modules/empresas/modules/premios/services/premios.service");
const implementaciones_service_1 = require("../../../../modules/empresas/modules/implementaciones/services/implementaciones.service");
const hitos_service_1 = require("../../../../modules/empresas/modules/hitos/services/hitos.service");
let FormularioService = class FormularioService {
    dataSource;
    tamaniosEmpresasService;
    empresasService;
    fundadoresService;
    imagenesService;
    serviciosService;
    familiasService;
    rubrosEmpresasService;
    itemsService;
    empresasTiposSocietariosService;
    sedesService;
    municipiosEmpresasService;
    operacionesInternacionalesService;
    premiosService;
    implementacionesService;
    hitosService;
    constructor(dataSource, tamaniosEmpresasService, empresasService, fundadoresService, imagenesService, serviciosService, familiasService, rubrosEmpresasService, itemsService, empresasTiposSocietariosService, sedesService, municipiosEmpresasService, operacionesInternacionalesService, premiosService, implementacionesService, hitosService) {
        this.dataSource = dataSource;
        this.tamaniosEmpresasService = tamaniosEmpresasService;
        this.empresasService = empresasService;
        this.fundadoresService = fundadoresService;
        this.imagenesService = imagenesService;
        this.serviciosService = serviciosService;
        this.familiasService = familiasService;
        this.rubrosEmpresasService = rubrosEmpresasService;
        this.itemsService = itemsService;
        this.empresasTiposSocietariosService = empresasTiposSocietariosService;
        this.sedesService = sedesService;
        this.municipiosEmpresasService = municipiosEmpresasService;
        this.operacionesInternacionalesService = operacionesInternacionalesService;
        this.premiosService = premiosService;
        this.implementacionesService = implementacionesService;
        this.hitosService = hitosService;
    }
    async registerEmpresa(data) {
        return this.dataSource.transaction(async (manager) => {
            const tamanioEmpresa = await this.tamaniosEmpresasService.findOne(data.tamanioEmpresa);
            const empresa = await this.empresasService.createTransaction(manager, data);
            const fundadores = await this.fundadoresService.createTransaction(manager, {
                idEmpresa: empresa.id,
                fundadores: data.fundadores
            });
            const imagenes = await this.imagenesService.createTransaction(manager, {
                idEmpresa: empresa.id,
                imagenes: data.imagenes
            });
            const servicios = await this.serviciosService.createTransaction(manager, {
                idEmpresa: empresa.id,
                servicio: data.servicios
            });
            const familia = await this.familiasService.createTransaction(manager, {
                idEmpresa: empresa.id,
                esFamiliar: data.familia.esFamiliar,
                anio: data.familia.anioDejo
            });
            const rubros = await this.rubrosEmpresasService.createTransaction(manager, {
                idEmpresa: empresa.id,
                ...data.rubros
            });
            const items = await this.itemsService.createTransaction(manager, {
                idEmpresa: empresa.id,
                items: data.items
            });
            const tiposSocietarios = await this.empresasTiposSocietariosService.createTransaction(manager, {
                idEmpresa: empresa.id,
                ...data.tiposSocietarios
            });
            const sedes = await this.sedesService.createTransaction(manager, {
                idEmpresa: empresa.id,
                sedes: data.sedes
            });
            const municipios = await this.municipiosEmpresasService.createTransaction(manager, {
                idEmpresa: empresa.id,
                municipios: data.municipios
            });
            const paisesOperaInternacionales = await this.operacionesInternacionalesService.createTransaction(manager, {
                idEmpresa: empresa.id,
                paisesOperaInternacionalmente: data.paisesOperaInternacionalmente
            });
            const reconocmienientos = await this.premiosService.createTransaction(manager, {
                idEmpresa: empresa.id,
                reconocimientos: data.reconocimientos
            });
            const implementacion = await this.implementacionesService.createTransaction(manager, {
                idEmpresa: empresa.id,
                ...data.implementacion
            });
            const hitos = await this.hitosService.createTransaction(manager, {
                idEmpresa: empresa.id,
                hitos: data.hitos
            });
            return empresa;
        });
    }
};
exports.FormularioService = FormularioService;
exports.FormularioService = FormularioService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource,
        tamanios_empresas_service_1.TamaniosEmpresasService,
        empresas_service_1.EmpresasService,
        fundadores_service_1.FundadoresService,
        imagenes_service_1.ImagenesService,
        servicios_service_1.ServiciosService,
        familias_service_1.FamiliasService,
        rubros_empresas_service_1.RubrosEmpresasService,
        items_service_1.ItemsService,
        empresas_tipos_societarios_service_1.EmpresasTiposSocietariosService,
        sedes_service_1.SedesService,
        municipios_empresa_service_1.MunicipiosEmpresaService,
        operaciones_internacionales_service_1.OperacionesInternacionalesService,
        premios_service_1.PremiosService,
        implementaciones_service_1.ImplementacionesService,
        hitos_service_1.HitosService])
], FormularioService);
//# sourceMappingURL=formulario.service.js.map