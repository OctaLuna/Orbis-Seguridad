import { ApiProperty } from "@nestjs/swagger";
import { RubroEmpresaPublicDto } from "../modules/rubros/modules/rubros-empresas/dto/rubro-empresa-public.dto";
import { DepartamentoPublicDto } from "../modules/departamentos/dto/departamento-public.dto";
import { HitoPublicDto } from "../modules/hitos/dto/hito-public.dto";

export class EmpresaPublicDto {
    @ApiProperty({
        description: 'Id de la empresa',
        type: Number
    })
    id: number

    @ApiProperty({
        description: 'Nombre de la empresa',
        type: String
    })
    nombreComercial: string

    @ApiProperty({
        description: 'Mensaje de la empresas',
        type: String
    })
    mensaje: string

    @ApiProperty({
        description: 'Lista de rubros relacionados con la empresa',
        type: [RubroEmpresaPublicDto]
    })
    rubrosEmpresa: RubroEmpresaPublicDto[]

    @ApiProperty({
        description: 'Sede central de la empresa',
        type: DepartamentoPublicDto
    })
    departamento: DepartamentoPublicDto

    @ApiProperty({
        description: 'Lista de url de imagenens de la empresa',
        type: [String]
    })
    imagenes: string[]

    @ApiProperty({
        description: 'Hitos de la empresa',
        type: [HitoPublicDto]
    })
    hitos: HitoPublicDto[]
}