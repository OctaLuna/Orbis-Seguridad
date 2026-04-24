import { Injectable } from "@nestjs/common";
import { EmpresasStatisticsService } from "src/modules/empresas/services/empresas-statistics.service";
import { GetEmpresasAnioParamsDto } from "../dto/api-input/get-empresas-anio-params.dto";
import { GetEmpresasTamaniosParamsDto } from "../dto/api-input/get-empresas-tamanios-params.dto";
import { GetAverageAntiguedadParamsDto } from "../dto/api-input/get-average-antiguedad-params.dto";
import { GetPromedioSedesParamsDto } from "../dto/api-input/get-promedio-sedes-params.dto";
import { RubrosStatisticsService } from "src/modules/empresas/modules/rubros/services/rubros-statistics.service";
import { GetPorcentajeRubroParamsDto } from "../dto/api-input/get-porcentajes-rubro-params.dto";
import { GetEmpresasAccionesParamsDto } from "../dto/api-input/get-empresas-acciones-params.dto";
import { DepartamentosStatisticsService } from "src/modules/empresas/modules/departamentos/services/departamentos-statistics.service";
import { HitosStatisticService } from "src/modules/empresas/modules/hitos/services/hitos-statistic.service";

@Injectable()
export class DashboardService {
    constructor(
        private readonly empresasStatisticsService: EmpresasStatisticsService,
        private readonly rubrosStatisticsService: RubrosStatisticsService,
        private readonly departamentosStatisticsService: DepartamentosStatisticsService,
        private readonly hitosStatisticService: HitosStatisticService,
    ){}

    async getAverageAntiguedad(params: GetAverageAntiguedadParamsDto){
        const avg = await this.empresasStatisticsService.getAverageAntiguedad(params);
        return avg;
    }

    async getEmpresasPorAnio(params: GetEmpresasAnioParamsDto){
        const data = await this.empresasStatisticsService.getEmpresasPorAnio(params)
        return data;
    }

    async getEmpresasPorTamanio(params: GetEmpresasTamaniosParamsDto){
        const data = await this.empresasStatisticsService.getEmpresasPorTamanio(params)
        return data;
    }

    async getPorcentajesRubros(params: GetPorcentajeRubroParamsDto){
        const data = await this.rubrosStatisticsService.getPorcentajesRubro(params);
        return data;
    }

    async getPromedioSedes(params: GetPromedioSedesParamsDto){
        const data = await this.empresasStatisticsService.getPromedioSedes(params);
        return data;
    }
    async getEmpresasAcciones(params: GetEmpresasAccionesParamsDto){
        const data = await this.empresasStatisticsService.getEmpresasAcciones(params);
        return data;
    }
    async getEmpresasPorDepartamentos(){
        const data = await this.departamentosStatisticsService.cedePrincipalPorDepatamento();
        return data;
    }

    async obtenerTotalHitosAnio(){
        const data = await this.hitosStatisticService.obtenerTotalesPorAnio();
        return data;
    }
}