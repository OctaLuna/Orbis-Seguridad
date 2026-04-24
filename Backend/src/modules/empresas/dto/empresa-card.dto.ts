import { ApiProperty } from "@nestjs/swagger";
import { ImagenCardDto } from "../modules/imagenes/dto/imagen-card.dto";
import { HitoPublicDto } from "../modules/hitos/dto/hito-public.dto";
import { DepartamentoPublicDto } from "../modules/departamentos/dto/departamento-public.dto";

export class EmpresaCardDto {
    @ApiProperty({
        description: 'Id de la empresa',
        type: Number
    })
    id: number

    @ApiProperty({
        description: 'Nomnre comercial de la empresa',
        type: String
    })
    nombreComercial: string

    @ApiProperty({
        description: 'Imagnes de la empresa',
        type: [ImagenCardDto]
    })
    imagenes: ImagenCardDto[]

    @ApiProperty({
        description: 'Lista de hitsos de la empresa',
        type: [HitoPublicDto]
    })
    hitos: HitoPublicDto[]

    @ApiProperty({
        description: 'Depratamento central',
        type: DepartamentoPublicDto
    })
    sedeCentral: DepartamentoPublicDto
}