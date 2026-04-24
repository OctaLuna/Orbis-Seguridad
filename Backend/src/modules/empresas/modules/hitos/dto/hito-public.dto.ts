import { ApiProperty } from "@nestjs/swagger";

export class HitoPublicDto {
    @ApiProperty({
        description: 'Id del hito de la empresa',
        type: Number
    })
    id: number

    @ApiProperty({
        description: 'Nombre del hito',
        type: String
    })
    nombre: string

    @ApiProperty({
        description: 'Fecha del hito',
        type: String
    })
    fecha: string
}