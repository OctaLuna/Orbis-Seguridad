"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_module_1 = require("./config/config.module");
const database_module_1 = require("./database/database.module");
const auth_module_1 = require("./app/services/auth/auth.module");
const usuarios_module_1 = require("./modules/usuarios/usuarios.module");
const empresas_module_1 = require("./modules/empresas/empresas.module");
const departamentos_module_1 = require("./modules/empresas/modules/departamentos/departamentos.module");
const familias_module_1 = require("./modules/empresas/modules/familias/familias.module");
const fundadores_module_1 = require("./modules/empresas/modules/fundadores/fundadores.module");
const hitos_module_1 = require("./modules/empresas/modules/hitos/hitos.module");
const imagenes_module_1 = require("./modules/empresas/modules/imagenes/imagenes.module");
const implementaciones_module_1 = require("./modules/empresas/modules/implementaciones/implementaciones.module");
const acciones_module_1 = require("./modules/empresas/modules/implementaciones/modules/acciones/acciones.module");
const tipos_acciones_module_1 = require("./modules/empresas/modules/implementaciones/modules/tipos-acciones/tipos-acciones.module");
const tipos_acciones_implementaciones_module_1 = require("./modules/empresas/modules/implementaciones/modules/tipos-acciones/modules/tipos-acciones-implementaciones/tipos-acciones-implementaciones.module");
const items_module_1 = require("./modules/empresas/modules/items/items.module");
const municipios_module_1 = require("./modules/empresas/modules/municipios/municipios.module");
const municipios_empresa_module_1 = require("./modules/empresas/modules/municipios/modules/municipios-empresa/municipios-empresa.module");
const operaciones_internacionales_module_1 = require("./modules/empresas/modules/operaciones-internacionales/operaciones-internacionales.module");
const premios_module_1 = require("./modules/empresas/modules/premios/premios.module");
const rubros_module_1 = require("./modules/empresas/modules/rubros/rubros.module");
const rubros_empresas_module_1 = require("./modules/empresas/modules/rubros/modules/rubros-empresas/rubros-empresas.module");
const sedes_module_1 = require("./modules/empresas/modules/sedes/sedes.module");
const tamanios_empresas_module_1 = require("./modules/empresas/modules/tamanios-empresas/tamanios-empresas.module");
const tipos_societarios_module_1 = require("./modules/empresas/modules/tipos-societarios/tipos-societarios.module");
const empresas_tipos_societarios_module_1 = require("./modules/empresas/modules/tipos-societarios/modules/empresas-tipos-societarios/empresas-tipos-societarios.module");
const roles_module_1 = require("./modules/usuarios/modules/roles/roles.module");
const implementaciones_acciones_module_1 = require("./modules/empresas/modules/implementaciones/modules/acciones/modules/implementaciones-acciones/implementaciones-acciones.module");
const proyectos_module_1 = require("./modules/empresas/modules/implementaciones/modules/acciones/modules/proyectos/proyectos.module");
const formulario_module_1 = require("./app/services/formulario/formulario.module");
const servicios_module_1 = require("./modules/empresas/modules/servicios/servicios.module");
const paises_module_1 = require("./modules/empresas/modules/paises/paises.module");
const dashboard_module_1 = require("./app/services/dashboard/dashboard.module");
const solicitudes_temporales_module_1 = require("./app/services/solicitudes-temporales/solicitudes-temporales.module");
const app_task_1 = require("./tasks/app.task");
const schedule_1 = require("@nestjs/schedule");
const email_module_1 = require("./shared/services/email/email.module");
const app_controller_1 = require("./app.controller");
const datamart_module_1 = require("./modules/datamart/datamart.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            schedule_1.ScheduleModule.forRoot(),
            email_module_1.EmailModule,
            config_module_1.MyConfigModule,
            database_module_1.DatabaseModule,
            auth_module_1.AuthModule,
            usuarios_module_1.UsuariosModule,
            roles_module_1.RolesModule,
            empresas_module_1.EmpresasModule,
            departamentos_module_1.DepartamentosModule,
            familias_module_1.FamiliasModule,
            fundadores_module_1.FundadoresModule,
            hitos_module_1.HitosModule,
            imagenes_module_1.ImagenesModule,
            implementaciones_module_1.ImplementacionesModule,
            acciones_module_1.AccionesModule,
            implementaciones_acciones_module_1.ImplementacionesAccionesModule,
            proyectos_module_1.ProyectosModule,
            tipos_acciones_module_1.TiposAccionesModule,
            tipos_acciones_implementaciones_module_1.TiposAccionesImplementacionesModule,
            items_module_1.ItemsModule,
            municipios_module_1.MunicipiosModule,
            municipios_empresa_module_1.MunicipiosEmpresaModule,
            operaciones_internacionales_module_1.OperacionesInternacionalesModule,
            paises_module_1.PaisesModule,
            premios_module_1.PremiosModule,
            rubros_module_1.RubrosModule,
            rubros_empresas_module_1.RubrosEmpresasModule,
            sedes_module_1.SedesModule,
            servicios_module_1.ServiciosModule,
            tamanios_empresas_module_1.TamaniosEmpresasModule,
            tipos_societarios_module_1.TiposSocietariosModule,
            empresas_tipos_societarios_module_1.EmpresasTiposSocietariosModule,
            formulario_module_1.FormularioModule,
            dashboard_module_1.DashboardModule,
            solicitudes_temporales_module_1.SolicitudesTemporalesModule,
            datamart_module_1.DatamartModule
        ],
        providers: [
            app_task_1.AppTask
        ],
        controllers: [app_controller_1.AppController]
    })
], AppModule);
//# sourceMappingURL=app.module.js.map