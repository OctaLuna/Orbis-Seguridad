import { ApiProperty } from "@nestjs/swagger";

export class RegisterReconocimientoDto {
    @ApiProperty({
        description: 'nombre del reconocimiento',
        type: String
    })
    nombre: string

    @ApiProperty({
        description: 'identificados si el reconocimiento es un premio o una distincion',
        type: Boolean
    })
    esPremio: boolean

    @ApiProperty({
        description: 'identificados si el reconocimiento nacional o internacional',
        type: Boolean
    })
    esNacional: boolean

    @ApiProperty({
        description: 'Anio en que obtuvo el premio',
        type: Number
    })
    anio: number
}