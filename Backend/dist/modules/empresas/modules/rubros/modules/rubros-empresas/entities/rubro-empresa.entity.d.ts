import { Empresa } from "src/modules/empresas/entities/empresa.entity";
import { Rubro } from "../../../entities/rubro.entity";
export declare class RubroEmpresa {
    id: number;
    idRubro: number;
    idEmpresa: number;
    esActivo: boolean;
    empresa: Empresa;
    rubro: Rubro;
}
