import { ApiProperty } from "@nestjs/swagger";

export class RubroPublicDto {
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
}