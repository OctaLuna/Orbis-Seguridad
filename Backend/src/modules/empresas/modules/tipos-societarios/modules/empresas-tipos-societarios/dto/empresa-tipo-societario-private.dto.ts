import { ApiProperty } from "@nestjs/swagger";
import { TipoSocietarioPrivateDto } from "../../../dto/tipo-societario-private.dto";

export class EmpresaTipoSocietarioPrivateDto {
    @ApiProperty({
        description: 'Id de la relacion entre tipo societario y empresa',
        type: Number
    })
    id: number

    @ApiProperty({
        description: 'Tipo de societario',
        type: TipoSocietarioPrivateDto
    })
    tipoSocietario: TipoSocietarioPrivateDto

    @ApiProperty({
        description: 'Define si esta activo',
        type: Boolean
    })
    esActivo: boolean

    @ApiProperty({
        description: 'Fecha de cambio del rubro',
        type: String
    })
    fechaCambio: string
}