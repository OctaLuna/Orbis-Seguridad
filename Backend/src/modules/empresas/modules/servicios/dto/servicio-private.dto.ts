import { ApiProperty } from "@nestjs/swagger";

export class ServicioPrivateDto {
    @ApiProperty({
        description: 'Id del servicio de la empresa',
        type: Number
    })
    id: number

    @ApiProperty({
        description: 'Nombre del servicio',
        type: String
    })
    nombre: string
}