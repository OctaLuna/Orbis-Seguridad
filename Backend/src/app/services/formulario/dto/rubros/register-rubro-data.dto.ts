import { ApiProperty } from "@nestjs/swagger"

export class RegisterRubroDataDto {
    @ApiProperty({
        description: 'Id del rubor seleccionado',
        type: Number
    })
    idRubro: number

    @ApiProperty({
        description: 'Tipo del rubro,true = valor default,false = anterior',
        type: Boolean,
        default: true
    })
    esActivo: boolean
}