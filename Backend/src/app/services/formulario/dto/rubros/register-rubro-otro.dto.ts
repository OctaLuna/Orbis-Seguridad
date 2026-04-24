import { ApiProperty } from "@nestjs/swagger"

export class RegisterRubroOtroDto {
    @ApiProperty({
        description: 'Nombre del rubro otro ingresado',
        type: String
    })
    nombre: string

    @ApiProperty({
        description: 'Tipo del rubro,true = valor default,false = anterior',
        type: Boolean,
        default: true
    })
    esActivo: boolean
}