import { ApiProperty } from "@nestjs/swagger";
import { RubroPublicDto } from "../../../dto/rubro-public.dto";

export class RubroEmpresaPublicDto {
    @ApiProperty({
        description: 'Rubro relacionado',
        type: RubroPublicDto
    })
    rubro: RubroPublicDto

    @ApiProperty({
        description: 'Estado del rubro',
        type: Boolean
    })
    esActivo: boolean
}