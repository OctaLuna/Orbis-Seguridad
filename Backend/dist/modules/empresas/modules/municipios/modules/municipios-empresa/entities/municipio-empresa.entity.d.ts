import { Empresa } from "src/modules/empresas/entities/empresa.entity";
import { Municipio } from "../../../entities/municipio.entity";
export declare class MunicipioEmpresa {
    id: number;
    idEmpresa: number;
    idMunicipio: number;
    empresa: Empresa;
    municipio: Municipio;
}
