import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class LoginDto {
    @ApiProperty({
        description: 'Nombre de usuario',
        type: String
    })
    @IsNotEmpty()
    usuario: string

    @ApiProperty({
        description: 'Contrasenia de usuario',
        type: String
    })
    @IsNotEmpty()
    contrasenia: string
}