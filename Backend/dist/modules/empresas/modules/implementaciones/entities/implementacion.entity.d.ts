import { Empresa } from "src/modules/empresas/entities/empresa.entity";
import { ImplementacionAccion } from "../modules/acciones/modules/implementaciones-acciones/entities/implementacion-accion.entity";
import { TipoAccionImplementacion } from "../modules/tipos-acciones/modules/tipos-acciones-implementaciones/entities/tipo-accion-implementacion.entity";
import { TipoAccion } from "../modules/tipos-acciones/entities/tipo-accion.entity";
export declare class Implementacion {
    id: number;
    anio: number;
    idEmpresa: number;
    empresa: Empresa;
    implementacionesAcciones: ImplementacionAccion[];
    tiposAccionesImplementaciones: TipoAccionImplementacion[];
    tiposAcciones: TipoAccion[];
}
