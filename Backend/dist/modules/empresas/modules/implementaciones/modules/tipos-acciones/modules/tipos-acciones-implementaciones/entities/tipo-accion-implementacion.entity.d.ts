import { Implementacion } from "src/modules/empresas/modules/implementaciones/entities/implementacion.entity";
import { TipoAccion } from "../../../entities/tipo-accion.entity";
export declare class TipoAccionImplementacion {
    id: number;
    idTipoAccion: number;
    idImplementacion: number;
    implementacion: Implementacion;
    tipoAccion: TipoAccion;
}
