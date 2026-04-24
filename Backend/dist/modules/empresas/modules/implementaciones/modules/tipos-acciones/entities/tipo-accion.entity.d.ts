import { TipoAccionImplementacion } from "../modules/tipos-acciones-implementaciones/entities/tipo-accion-implementacion.entity";
import { Implementacion } from "../../../entities/implementacion.entity";
export declare class TipoAccion {
    id: number;
    nombre: string;
    tiposAccionesImplementaciones: TipoAccionImplementacion[];
    implementaciones: Implementacion[];
}
