import { Implementacion } from "src/modules/empresas/modules/implementaciones/entities/implementacion.entity";
import { Accion } from "../../../entities/accion.entity";
import { Proyecto } from "../../proyectos/entities/proyecto.entity";
export declare class ImplementacionAccion {
    id: number;
    idAccion: number;
    idImplementacion: number;
    implementacion: Implementacion;
    accion: Accion;
    proyectos: Proyecto[];
}
