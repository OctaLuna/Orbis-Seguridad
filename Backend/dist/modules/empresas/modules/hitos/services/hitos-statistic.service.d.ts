import { Hito } from "../entities/hito.entity";
import { Repository } from "typeorm";
export declare class HitosStatisticService {
    private readonly hitoRepository;
    constructor(hitoRepository: Repository<Hito>);
    obtenerTotalesPorAnio(): Promise<{
        anio: number;
        total: number;
    }[]>;
}
