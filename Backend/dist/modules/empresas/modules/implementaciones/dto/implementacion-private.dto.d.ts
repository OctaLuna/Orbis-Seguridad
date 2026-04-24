import { ImplementacionAccionDto } from "../modules/acciones/modules/implementaciones-acciones/dto/implementacion-accion.dto";
import { TipoAccionDto } from "../modules/tipos-acciones/dto/tipo-accion.dto";
export declare class ImplementacionPrivateDto {
    id: number;
    anio: number;
    implementacionesAcciones: ImplementacionAccionDto;
    tiposAcciones: TipoAccionDto[];
}
