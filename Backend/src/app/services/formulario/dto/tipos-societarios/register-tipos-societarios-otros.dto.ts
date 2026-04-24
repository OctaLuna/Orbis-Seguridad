import { ApiProperty } from "@nestjs/swagger";

export class RegisterTiposSocietariosOtrosDto {
    @ApiProperty({
        description: 'Nombre del tipo societario ingresado',
        type: String
    })
    nombre: string

    @ApiProperty({
        description: 'Tipo de respuesta: true = default, false = si cambio antes',
        type: Boolean,
        default: true
    })
    esActivo: boolean

    @ApiProperty({
        description: 'Fecha que se cambio, solo si esActivo es false',
        type: String,
        nullable: true,
        example: '2000-01-01'
    })
    fechaCambio: string

    
}