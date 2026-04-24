import { Empresa } from "src/modules/empresas/entities/empresa.entity";
import { Departamento } from "../../departamentos/entities/departamento.entity";
export declare class Sede {
    id: number;
    idDepartamento: number;
    idEmpresa: number;
    esCentral: boolean;
    empresa: Empresa;
    departamento: Departamento;
}
