import { Repository } from "typeorm";
import { Departamento } from "../entities/departamento.entity";
export declare class DepartamentosStatisticsService {
    private readonly depertamentoRepository;
    constructor(depertamentoRepository: Repository<Departamento>);
    cedePrincipalPorDepatamento(): Promise<{
        idDepartamento: number;
        nombreDepartamento: any;
        cantidadEmpresas: number;
    }[]>;
}
