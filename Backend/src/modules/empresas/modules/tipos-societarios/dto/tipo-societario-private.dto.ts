import { ApiProperty } from "@nestjs/swagger";

export class TipoSocietarioPrivateDto {
    @ApiProperty({
        description: 'Id del tipo de societario',
        type: Number
    })
    id: number

    @ApiProperty({
        description: 'Nombre del tipo societario',
        type: String
    })
    nombre: string

    @ApiProperty({
        description: 'Define si es prpio el tipo de societario',
        type: Boolean
    })
    esPropio: boolean
}