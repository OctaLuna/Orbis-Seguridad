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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardController = void 0;
const common_1 = require("@nestjs/common");
const dashboard_service_1 = require("../services/dashboard.service");
const utils_1 = require("../../../../common/utils");
const swagger_1 = require("@nestjs/swagger");
const get_promedio_antiguedad_dto_1 = require("../dto/api-response/get-promedio-antiguedad.dto");
const get_empresas_anio_dto_1 = require("../dto/api-response/get-empresas-anio.dto");
const get_empresas_anio_params_dto_1 = require("../dto/api-input/get-empresas-anio-params.dto");
const get_empresas_tamanios_params_dto_1 = require("../dto/api-input/get-empresas-tamanios-params.dto");
const get_empresas_tamanios_dto_1 = require("../dto/api-response/get-empresas-tamanios.dto");
const get_average_antiguedad_params_dto_1 = require("../dto/api-input/get-average-antiguedad-params.dto");
const get_statistics_params_dto_1 = require("../dto/get-statistics-params.dto");
const get_promedio_sedes_dto_1 = require("../dto/api-response/get-promedio-sedes.dto");
const get_porcentajes_rubro_params_dto_1 = require("../dto/api-input/get-porcentajes-rubro-params.dto");
const get_porcentajes_rubro_dto_1 = require("../dto/api-response/get-porcentajes-rubro.dto");
const get_empresas_acciones_params_dto_1 = require("../dto/api-input/get-empresas-acciones-params.dto");
const get_empresas_acciones_dto_1 = require("../dto/api-response/get-empresas-acciones.dto");
const get_empresas_departamento_dto_1 = require("../dto/api-response/get-empresas-departamento.dto");
const get_total_hitos_anio_dto_1 = require("../dto/api-response/get-total-hitos-anio.dto");
let DashboardController = class DashboardController {
    dashboardService;
    constructor(dashboardService) {
        this.dashboardService = dashboardService;
    }
    async getPromedioAntiguedad(params, res) {
        const avg = await this.dashboardService.getAverageAntiguedad(params);
        return (0, utils_1.OkRes)(res, {
            promedio: avg
        });
    }
    async getEmpresasPorAnio(params, res) {
        const data = await this.dashboardService.getEmpresasPorAnio(params);
        return (0, utils_1.OkRes)(res, {
            empresasAnio: data
        });
    }
    async getTamaniosEmpresas(params, res) {
        const data = await this.dashboardService.getEmpresasPorTamanio(params);
        return (0, utils_1.OkRes)(res, {
            tamanios: data
        });
    }
    async getEmpresasPorSectorEconomico(params, res) {
        const rubros = await this.dashboardService.getPorcentajesRubros(params);
        return (0, utils_1.OkRes)(res, {
            rubros: rubros
        });
    }
    async getPromedioSedes(params, res) {
        const promedio = await this.dashboardService.getPromedioSedes(params);
        return (0, utils_1.OkRes)(res, {
            promedio: promedio
        });
    }
    async getEmpresasAcciones(params, res) {
        const acciones = await this.dashboardService.getEmpresasAcciones(params);
        return (0, utils_1.OkRes)(res, acciones);
    }
    async getEmpresasDepartamentos(res) {
        const conteos = await this.dashboardService.getEmpresasPorDepartamentos();
        return (0, utils_1.OkRes)(res, {
            departamentos: conteos
        });
    }
    async getTotalHitosAnio(res) {
        const data = await this.dashboardService.obtenerTotalHitosAnio();
        return (0, utils_1.OkRes)(res, {
            hitos: data
        });
    }
};
exports.DashboardController = DashboardController;
__decorate([
    (0, common_1.Get)('/promedio-antiguedad'),
    (0, swagger_1.ApiOperation)({
        summary: 'Api para obtener el promedio de anios de antiguedad',
        description: 'Este endpoint es para obtener el promedio de anios de antiguedad en base a el anio de fundacion de la empresa'
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Respuesta en caso de obtener el promedio de antiguedad exitosamente',
        type: get_promedio_antiguedad_dto_1.GetPromedioAntiguedadDto
    }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_average_antiguedad_params_dto_1.GetAverageAntiguedadParamsDto, Object]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getPromedioAntiguedad", null);
__decorate([
    (0, common_1.Get)('/empresas-anio'),
    (0, swagger_1.ApiOperation)({
        summary: 'Api para obtener el el total de empresas registradas por anio de fundacion',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Respuesta en caso de obtner las empresa por anio exitosamente',
        type: get_empresas_anio_dto_1.GetEmpresasAnio
    }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_empresas_anio_params_dto_1.GetEmpresasAnioParamsDto, Object]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getEmpresasPorAnio", null);
__decorate([
    (0, common_1.Get)('/empresas-tamanios-porcentaje'),
    (0, swagger_1.ApiOperation)({
        summary: 'API para obtener los tamanis de empresas con datos estaditsticos'
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Respuesta en caso de obtener los datos de tamanis de empresas',
        type: get_empresas_tamanios_dto_1.GetEmpresasTamaniosDto
    }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_empresas_tamanios_params_dto_1.GetEmpresasTamaniosParamsDto, Object]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getTamaniosEmpresas", null);
__decorate([
    (0, common_1.Get)('/porcentajes-rubros'),
    (0, swagger_1.ApiOperation)({
        summary: 'Api para obtener los porcentajes de empresas por rubro',
        description: 'Esto devuelve una lisat de rubros donde cada porcentaje pertenece a las empresas que tiene regustradas este rubro'
    }),
    (0, swagger_1.ApiOkResponse)({
        type: get_porcentajes_rubro_dto_1.GetPorcentajesRubroDto,
        description: 'Respuesta en caso de obtener los porcentajes de cada rubro'
    }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_porcentajes_rubro_params_dto_1.GetPorcentajeRubroParamsDto, Object]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getEmpresasPorSectorEconomico", null);
__decorate([
    (0, common_1.Get)('/promedio-sedes'),
    (0, swagger_1.ApiOperation)({
        summary: 'Api para obtener el promedio de sedes'
    }),
    (0, swagger_1.ApiOkResponse)({
        type: get_promedio_sedes_dto_1.GetPromedioSedesDto,
        description: 'Respuesta en caso de obtener exitosmaente el promedio de sedes'
    }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_statistics_params_dto_1.GetStatisticsParamsDto, Object]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getPromedioSedes", null);
__decorate([
    (0, common_1.Get)('porciones-accion'),
    (0, swagger_1.ApiOperation)({
        summary: 'Api para obtener le proporcion de empresas con ods y sin ods'
    }),
    (0, swagger_1.ApiOkResponse)({
        type: get_empresas_acciones_dto_1.GetEmpresasAccionesDto,
        description: 'Respuesta en caso de obtener exitosamente los porcentajes'
    }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_empresas_acciones_params_dto_1.GetEmpresasAccionesParamsDto, Object]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getEmpresasAcciones", null);
__decorate([
    (0, common_1.Get)('empresas-departamento'),
    (0, swagger_1.ApiOperation)({
        summary: 'Api para obtener el conteo de de empresas que tiene como central cada departamento'
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Repuesta en caso de obtener los conteos exitosamente',
        type: get_empresas_departamento_dto_1.GetEmpresasDepartamentosResponseDto
    }),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getEmpresasDepartamentos", null);
__decorate([
    (0, common_1.Get)('total-hitos-anio'),
    (0, swagger_1.ApiOperation)({
        summary: 'Api para obtener total de hitos por anio',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Respuesta en caso de obtenre la lista hitos por anio',
        type: get_total_hitos_anio_dto_1.GetTotalHitosAnio
    }),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DashboardController.prototype, "getTotalHitosAnio", null);
exports.DashboardController = DashboardController = __decorate([
    (0, swagger_1.ApiTags)('Dashboard'),
    (0, common_1.Controller)('api/dashboard'),
    __metadata("design:paramtypes", [dashboard_service_1.DashboardService])
], DashboardController);
//# sourceMappingURL=dashboard.controller.js.map