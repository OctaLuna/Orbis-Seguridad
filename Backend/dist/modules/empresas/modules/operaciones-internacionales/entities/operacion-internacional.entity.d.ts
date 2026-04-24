import { Empresa } from "src/modules/empresas/entities/empresa.entity";
import { Pais } from "../../paises/entities/pais.entity";
export declare class OperacionInternacional {
    id: number;
    idPais: number;
    idEmpresa: number;
    url: string;
    empresa: Empresa;
    pais: Pais;
}
