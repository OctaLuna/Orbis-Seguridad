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
export declare class DashboardService {
    private readonly empresasStatisticsService;
    private readonly rubrosStatisticsService;
    private readonly departamentosStatisticsService;
    private readonly hitosStatisticService;
    constructor(empresasStatisticsService: EmpresasStatisticsService, rubrosStatisticsService: RubrosStatisticsService, departamentosStatisticsService: DepartamentosStatisticsService, hitosStatisticService: HitosStatisticService);
    getAverageAntiguedad(params: GetAverageAntiguedadParamsDto): Promise<number>;
    getEmpresasPorAnio(params: GetEmpresasAnioParamsDto): Promise<{
        anio: number;
        total: number;
    }[]>;
    getEmpresasPorTamanio(params: GetEmpresasTamaniosParamsDto): Promise<{
        idTamanio: number;
        nombreTamanio: string;
        total: number;
        porcentaje: number;
    }[]>;
    getPorcentajesRubros(params: GetPorcentajeRubroParamsDto): Promise<{
        idRubro: number;
        nombreRubro: string;
        totalEmpresas: number;
        porcentaje: number;
    }[]>;
    getPromedioSedes(params: GetPromedioSedesParamsDto): Promise<number>;
    getEmpresasAcciones(params: GetEmpresasAccionesParamsDto): Promise<{
        conAcciones: number;
        sinAcciones: number;
    }>;
    getEmpresasPorDepartamentos(): Promise<{
        idDepartamento: number;
        nombreDepartamento: any;
        cantidadEmpresas: number;
    }[]>;
    obtenerTotalHitosAnio(): Promise<{
        anio: number;
        total: number;
    }[]>;
}
