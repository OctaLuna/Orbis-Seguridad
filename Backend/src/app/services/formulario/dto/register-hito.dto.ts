import { ApiProperty } from "@nestjs/swagger";

export class RegisterHitoDto {
    @ApiProperty({
        description: 'nombre del hito',
        type: String
    })
    nombre: string

    @ApiProperty({
        description: 'descripcion del hito',
        type: String
    })
    descripcion: string

    @ApiProperty({
        description: 'Fecha del hito',
        type: String,
        example: '2001-01-01'
    })
    fecha: string
}