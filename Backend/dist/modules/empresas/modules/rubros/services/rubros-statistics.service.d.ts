import { Repository } from "typeorm";
import { Rubro } from "../entities/rubro.entity";
import { GetPorcentajeRubroParamsDto } from "src/app/services/dashboard/dto/api-input/get-porcentajes-rubro-params.dto";
export declare class RubrosStatisticsService {
    private readonly rubroRepository;
    constructor(rubroRepository: Repository<Rubro>);
    getPorcentajesRubro(params: GetPorcentajeRubroParamsDto): Promise<{
        idRubro: number;
        nombreRubro: string;
        totalEmpresas: number;
        porcentaje: number;
    }[]>;
}
