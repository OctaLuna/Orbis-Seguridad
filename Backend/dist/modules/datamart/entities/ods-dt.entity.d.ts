import { EmpresaDt } from "./empresa-dt.entity";
import { ProyectoDt } from "./proyecto-dt.enity";
export declare class OdsDt {
    id: number;
    nombre: string;
    idEmpresa: number;
    empresa: EmpresaDt;
    proyectos: ProyectoDt[];
}
