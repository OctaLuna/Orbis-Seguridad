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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const empresas_statistics_service_1 = require("../../../../modules/empresas/services/empresas-statistics.service");
const rubros_statistics_service_1 = require("../../../../modules/empresas/modules/rubros/services/rubros-statistics.service");
const departamentos_statistics_service_1 = require("../../../../modules/empresas/modules/departamentos/services/departamentos-statistics.service");
const hitos_statistic_service_1 = require("../../../../modules/empresas/modules/hitos/services/hitos-statistic.service");
let DashboardService = class DashboardService {
    empresasStatisticsService;
    rubrosStatisticsService;
    departamentosStatisticsService;
    hitosStatisticService;
    constructor(empresasStatisticsService, rubrosStatisticsService, departamentosStatisticsService, hitosStatisticService) {
        this.empresasStatisticsService = empresasStatisticsService;
        this.rubrosStatisticsService = rubrosStatisticsService;
        this.departamentosStatisticsService = departamentosStatisticsService;
        this.hitosStatisticService = hitosStatisticService;
    }
    async getAverageAntiguedad(params) {
        const avg = await this.empresasStatisticsService.getAverageAntiguedad(params);
        return avg;
    }
    async getEmpresasPorAnio(params) {
        const data = await this.empresasStatisticsService.getEmpresasPorAnio(params);
        return data;
    }
    async getEmpresasPorTamanio(params) {
        const data = await this.empresasStatisticsService.getEmpresasPorTamanio(params);
        return data;
    }
    async getPorcentajesRubros(params) {
        const data = await this.rubrosStatisticsService.getPorcentajesRubro(params);
        return data;
    }
    async getPromedioSedes(params) {
        const data = await this.empresasStatisticsService.getPromedioSedes(params);
        return data;
    }
    async getEmpresasAcciones(params) {
        const data = await this.empresasStatisticsService.getEmpresasAcciones(params);
        return data;
    }
    async getEmpresasPorDepartamentos() {
        const data = await this.departamentosStatisticsService.cedePrincipalPorDepatamento();
        return data;
    }
    async obtenerTotalHitosAnio() {
        const data = await this.hitosStatisticService.obtenerTotalesPorAnio();
        return data;
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [empresas_statistics_service_1.EmpresasStatisticsService,
        rubros_statistics_service_1.RubrosStatisticsService,
        departamentos_statistics_service_1.DepartamentosStatisticsService,
        hitos_statistic_service_1.HitosStatisticService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map