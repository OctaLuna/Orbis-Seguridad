import { ApiProperty } from "@nestjs/swagger";
import { RegisterTiposSocietariosDataDto } from "./register-tipos-societarios-data.dto";
import { RegisterTiposSocietariosOtrosDto } from "./register-tipos-societarios-otros.dto";

export class RegisterTiposSocietariosDto {
    @ApiProperty({
        description: 'Tipos societarios seleccionados',
        type: [RegisterTiposSocietariosDataDto],
    })
    data: RegisterTiposSocietariosDataDto[]

    @ApiProperty({
        description: 'TIpos societario ingresados como otros',
        type: [RegisterTiposSocietariosOtrosDto]
    })
    otros: RegisterTiposSocietariosOtrosDto[]
}