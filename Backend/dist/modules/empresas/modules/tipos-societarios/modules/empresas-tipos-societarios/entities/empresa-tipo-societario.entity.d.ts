import { Empresa } from "src/modules/empresas/entities/empresa.entity";
import { TipoSocietario } from "../../../entities/tipo-societario.entity";
export declare class EmpresaTipoSocietario {
    id: number;
    idEmpresa: number;
    idTipsoc: number;
    esActivo: boolean;
    fechaCambio: string;
    empresa: Empresa;
    tipoSocietario: TipoSocietario;
}
