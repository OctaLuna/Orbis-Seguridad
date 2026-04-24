import { RubroEmpresaPublicDto } from "../modules/rubros/modules/rubros-empresas/dto/rubro-empresa-public.dto";
import { DepartamentoPublicDto } from "../modules/departamentos/dto/departamento-public.dto";
import { HitoPublicDto } from "../modules/hitos/dto/hito-public.dto";
export declare class EmpresaPublicDto {
    id: number;
    nombreComercial: string;
    mensaje: string;
    rubrosEmpresa: RubroEmpresaPublicDto[];
    departamento: DepartamentoPublicDto;
    imagenes: string[];
    hitos: HitoPublicDto[];
}
