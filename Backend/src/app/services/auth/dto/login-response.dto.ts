import { ApiProperty } from "@nestjs/swagger";
import { CommonResponseDto } from "src/shared/dto/common-response.dto";

export class LoginResponseDto extends CommonResponseDto {
    @ApiProperty({
        description: 'Token de acceso',
        type: String
    })
    access_token: string

    @ApiProperty({
        description: 'Id de usuario',
        type: String
    })
    idUsuario: string

    @ApiProperty({
        description: 'Id del rol del usuario',
        type: Number
    })
    idRol: number

    @ApiProperty({
        description: 'Indica si el usuario debe cambiar su contraseña antes de operar',
        type: Boolean
    })
    must_change_password: boolean
}