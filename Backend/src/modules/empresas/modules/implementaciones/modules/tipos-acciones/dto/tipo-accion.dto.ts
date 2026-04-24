import { ApiProperty } from "@nestjs/swagger";

export class TipoAccionDto {
    @ApiProperty({
        description: 'Id de l tipo de accion',
        type: Number
    })
    id: number

    @ApiProperty({
        description: 'Nombre del tipo de Accion',
        type: String
    })
    nombre: string
}