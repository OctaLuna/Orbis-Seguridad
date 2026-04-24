import { ApiProperty } from "@nestjs/swagger";
import { RubroPrivateDto } from "../../../dto/rubro-private.dto";

export class RubroEmpresaPrivateDto {
    @ApiProperty({
        description: 'Id del rubro de la emrpesa',
        type: Number
    })
    id: number

    @ApiProperty({
        description: 'Rubro de le empresa',
        type: RubroPrivateDto
    })
    rubro: RubroPrivateDto

    @ApiProperty({
        description: 'Define que si esta activo',
        type: Boolean
    })
    esActivo: boolean
}