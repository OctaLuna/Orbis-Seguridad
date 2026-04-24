import { EmpresaTipoSocietario } from "../modules/empresas-tipos-societarios/entities/empresa-tipo-societario.entity";
export declare class TipoSocietario {
    id: number;
    nombre: string;
    esPropio: boolean;
    tiposSocietariosEmpresa: EmpresaTipoSocietario[];
}
