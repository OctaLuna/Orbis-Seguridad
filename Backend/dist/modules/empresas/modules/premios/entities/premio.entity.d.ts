import { Empresa } from "src/modules/empresas/entities/empresa.entity";
export declare class Premio {
    id: number;
    nombre: string;
    esPremio: boolean;
    esNacional: boolean;
    anio: number;
    idEmpresa: number;
    empresa: Empresa;
}
