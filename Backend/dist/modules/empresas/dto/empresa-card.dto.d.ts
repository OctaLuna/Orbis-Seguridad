import { ImagenCardDto } from "../modules/imagenes/dto/imagen-card.dto";
import { HitoPublicDto } from "../modules/hitos/dto/hito-public.dto";
import { DepartamentoPublicDto } from "../modules/departamentos/dto/departamento-public.dto";
export declare class EmpresaCardDto {
    id: number;
    nombreComercial: string;
    imagenes: ImagenCardDto[];
    hitos: HitoPublicDto[];
    sedeCentral: DepartamentoPublicDto;
}
