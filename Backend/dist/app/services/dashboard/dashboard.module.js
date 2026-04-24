"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardModule = void 0;
const common_1 = require("@nestjs/common");
const empresas_module_1 = require("../../../modules/empresas/empresas.module");
const dashboard_service_1 = require("./services/dashboard.service");
const dashboard_controller_1 = require("./api/dashboard.controller");
const rubros_module_1 = require("../../../modules/empresas/modules/rubros/rubros.module");
const departamentos_module_1 = require("../../../modules/empresas/modules/departamentos/departamentos.module");
const hitos_module_1 = require("../../../modules/empresas/modules/hitos/hitos.module");
let DashboardModule = class DashboardModule {
};
exports.DashboardModule = DashboardModule;
exports.DashboardModule = DashboardModule = __decorate([
    (0, common_1.Module)({
        imports: [
            empresas_module_1.EmpresasModule,
            rubros_module_1.RubrosModule,
            departamentos_module_1.DepartamentosModule,
            hitos_module_1.HitosModule,
        ],
        providers: [dashboard_service_1.DashboardService],
        controllers: [dashboard_controller_1.DashboardController],
        exports: [dashboard_service_1.DashboardService]
    })
], DashboardModule);
//# sourceMappingURL=dashboard.module.js.map