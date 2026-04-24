import { ApiProperty } from "@nestjs/swagger";

export class AccionDto {
    @ApiProperty({
        description: 'id de la accion',
        type: Number
    })
    id: number

    @ApiProperty({
        description: 'Nombre de la accion',
        type: String
    })
    nombre: string
}