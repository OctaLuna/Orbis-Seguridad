import { Empresa } from "../entities/empresa.entity";
import { Repository } from "typeorm";
import { GetEmpresasAnioParamsDto } from "src/app/services/dashboard/dto/api-input/get-empresas-anio-params.dto";
import { GetEmpresasTamaniosParamsDto } from "src/app/services/dashboard/dto/api-input/get-empresas-tamanios-params.dto";
import { GetAverageAntiguedadParamsDto } from "src/app/services/dashboard/dto/api-input/get-average-antiguedad-params.dto";
import { GetPromedioSedesParamsDto } from "src/app/services/dashboard/dto/api-input/get-promedio-sedes-params.dto";
import { GetEmpresasAccionesParamsDto } from "src/app/services/dashboard/dto/api-input/get-empresas-acciones-params.dto";
export declare class EmpresasStatisticsService {
    private readonly empresaRepository;
    constructor(empresaRepository: Repository<Empresa>);
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
    getPromedioSedes(params: GetPromedioSedesParamsDto): Promise<number>;
    getEmpresasAcciones(params: GetEmpresasAccionesParamsDto): Promise<{
        conAcciones: number;
        sinAcciones: number;
    }>;
}
