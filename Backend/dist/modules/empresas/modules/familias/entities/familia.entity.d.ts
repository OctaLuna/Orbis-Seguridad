import { Empresa } from "src/modules/empresas/entities/empresa.entity";
export declare class Familia {
    id: number;
    idEmpresa: number;
    esFamiliar: boolean;
    anio: number;
    empresa: Empresa;
}
