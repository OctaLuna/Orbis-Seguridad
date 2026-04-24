import { RubroEmpresa } from "../modules/rubros-empresas/entities/rubro-empresa.entity";
export declare class Rubro {
    id: number;
    nombre: string;
    esPropio: boolean;
    rubroEmpresas: RubroEmpresa[];
}
