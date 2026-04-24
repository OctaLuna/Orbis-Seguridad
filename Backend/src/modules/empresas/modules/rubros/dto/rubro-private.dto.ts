import { ApiProperty } from "@nestjs/swagger";

export class RubroPrivateDto {
    @ApiProperty({
        description: 'Id del rubro',
        type: Number
    })
    id: number

    @ApiProperty({
        description: 'Nombre del rubro',
        type: String
    })
    nombre: string

    @ApiProperty({
        description: 'Define si el rubro es propio',
        type: Boolean
    })
    esPropio: boolean
}