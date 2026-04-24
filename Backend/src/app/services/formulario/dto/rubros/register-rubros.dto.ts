import { ApiProperty } from "@nestjs/swagger";
import { RegisterRubroDataDto } from "./register-rubro-data.dto";
import { RegisterRubroOtroDto } from "./register-rubro-otro.dto";

export class RegisterRubrosDto {
    @ApiProperty({
        description: 'Rubros de la lista de seleccion, maximo 2',
        type: RegisterRubroDataDto,
        nullable: true,
        isArray: true
    })
    data: RegisterRubroDataDto[]

    @ApiProperty({
        description: 'Rubros otros personales de empresa, maximo 2',
        type: RegisterRubroOtroDto,
        nullable: true,
        isArray: true
    })
    otros: RegisterRubroOtroDto[]
}