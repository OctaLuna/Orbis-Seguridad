import { MunicipioEmpresa } from "../modules/municipios-empresa/entities/municipio-empresa.entity";
import { Empresa } from "src/modules/empresas/entities/empresa.entity";
export declare class Municipio {
    id: number;
    idDepartamento: number;
    nombreMunicipio: string;
    municipiosEmpresas: MunicipioEmpresa[];
    empresas: Empresa[];
}
