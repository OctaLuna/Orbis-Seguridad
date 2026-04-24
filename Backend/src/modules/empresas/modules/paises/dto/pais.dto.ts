import { ApiProperty } from "@nestjs/swagger";

export class PaisDto {
    @ApiProperty({
        description: 'Id del pais',
        type: Number
    })
    id: number

    @ApiProperty({
        description: 'Nombre del pais',
        type: String
    })
    nombre: string
}