import { Empresa } from "src/modules/empresas/entities/empresa.entity";
export declare class Hito {
    id: number;
    idEmpresa: number;
    descripcion: string;
    fecha: string;
    nombre: string;
    empresa: Empresa;
}
