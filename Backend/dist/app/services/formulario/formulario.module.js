"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormularioModule = void 0;
const common_1 = require("@nestjs/common");
const formulario_service_1 = require("./services/formulario.service");
const formulario_controller_1 = require("./api/formulario.controller");
const tamanios_empresas_module_1 = require("../../../modules/empresas/modules/tamanios-empresas/tamanios-empresas.module");
const fundadores_module_1 = require("../../../modules/empresas/modules/fundadores/fundadores.module");
const empresas_module_1 = require("../../../modules/empresas/empresas.module");
const imagenes_module_1 = require("../../../modules/empresas/modules/imagenes/imagenes.module");
const servicios_module_1 = require("../../../modules/empresas/modules/servicios/servicios.module");
const familias_module_1 = require("../../../modules/empresas/modules/familias/familias.module");
const rubros_empresas_module_1 = require("../../../modules/empresas/modules/rubros/modules/rubros-empresas/rubros-empresas.module");
const items_module_1 = require("../../../modules/empresas/modules/items/items.module");
const empresas_tipos_societarios_module_1 = require("../../../modules/empresas/modules/tipos-societarios/modules/empresas-tipos-societarios/empresas-tipos-societarios.module");
const sedes_module_1 = require("../../../modules/empresas/modules/sedes/sedes.module");
const municipios_empresa_module_1 = require("../../../modules/empresas/modules/municipios/modules/municipios-empresa/municipios-empresa.module");
const operaciones_internacionales_module_1 = require("../../../modules/empresas/modules/operaciones-internacionales/operaciones-internacionales.module");
const premios_module_1 = require("../../../modules/empresas/modules/premios/premios.module");
const implementaciones_module_1 = require("../../../modules/empresas/modules/implementaciones/implementaciones.module");
const hitos_module_1 = require("../../../modules/empresas/modules/hitos/hitos.module");
let FormularioModule = class FormularioModule {
};
exports.FormularioModule = FormularioModule;
exports.FormularioModule = FormularioModule = __decorate([
    (0, common_1.Module)({
        imports: [
            tamanios_empresas_module_1.TamaniosEmpresasModule,
            fundadores_module_1.FundadoresModule,
            empresas_module_1.EmpresasModule,
            imagenes_module_1.ImagenesModule,
            servicios_module_1.ServiciosModule,
            familias_module_1.FamiliasModule,
            rubros_empresas_module_1.RubrosEmpresasModule,
            items_module_1.ItemsModule,
            empresas_tipos_societarios_module_1.EmpresasTiposSocietariosModule,
            sedes_module_1.SedesModule,
            municipios_empresa_module_1.MunicipiosEmpresaModule,
            operaciones_internacionales_module_1.OperacionesInternacionalesModule,
            premios_module_1.PremiosModule,
            implementaciones_module_1.ImplementacionesModule,
            hitos_module_1.HitosModule,
        ],
        providers: [formulario_service_1.FormularioService],
        controllers: [formulario_controller_1.FormularioController]
    })
], FormularioModule);
//# sourceMappingURL=formulario.module.js.map