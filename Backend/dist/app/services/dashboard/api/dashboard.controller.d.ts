import { DashboardService } from "../services/dashboard.service";
import { Response } from "express";
import { GetEmpresasAnioParamsDto } from "../dto/api-input/get-empresas-anio-params.dto";
import { GetEmpresasTamaniosParamsDto } from "../dto/api-input/get-empresas-tamanios-params.dto";
import { GetAverageAntiguedadParamsDto } from "../dto/api-input/get-average-antiguedad-params.dto";
import { GetStatisticsParamsDto } from "../dto/get-statistics-params.dto";
import { GetPorcentajeRubroParamsDto } from "../dto/api-input/get-porcentajes-rubro-params.dto";
import { GetEmpresasAccionesParamsDto } from "../dto/api-input/get-empresas-acciones-params.dto";
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    getPromedioAntiguedad(params: GetAverageAntiguedadParamsDto, res: Response): Promise<Response<any, Record<string, any>>>;
    getEmpresasPorAnio(params: GetEmpresasAnioParamsDto, res: Response): Promise<Response<any, Record<string, any>>>;
    getTamaniosEmpresas(params: GetEmpresasTamaniosParamsDto, res: Response): Promise<Response<any, Record<string, any>>>;
    getEmpresasPorSectorEconomico(params: GetPorcentajeRubroParamsDto, res: Response): Promise<Response<any, Record<string, any>>>;
    getPromedioSedes(params: GetStatisticsParamsDto, res: Response): Promise<Response<any, Record<string, any>>>;
    getEmpresasAcciones(params: GetEmpresasAccionesParamsDto, res: Response): Promise<Response<any, Record<string, any>>>;
    getEmpresasDepartamentos(res: Response): Promise<Response<any, Record<string, any>>>;
    getTotalHitosAnio(res: Response): Promise<Response<any, Record<string, any>>>;
}
