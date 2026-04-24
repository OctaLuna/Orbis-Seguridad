import { ApiProperty } from "@nestjs/swagger";

export class PremioPrivateDto {
    @ApiProperty({
        description: 'Id del premio',
        type: Number
    })
    id: number

    @ApiProperty({
        description: 'Nombre del premio',
        type: String
    })
    nombre: string

    @ApiProperty({
        description: 'Define si es premio o reconocimiento',
        type: Boolean
    })
    esPremio: boolean

    @ApiProperty({
        description: 'Define si es nacional',
        type: Boolean
    })
    esNacional: boolean
}