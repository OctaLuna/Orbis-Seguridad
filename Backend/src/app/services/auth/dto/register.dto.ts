import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsNotEmpty, IsNumber, MaxLength, Min, MinLength } from "class-validator"

export class RegisterDto {
    @ApiProperty({
        description: 'Nombre de usuario',
        type: String,
        required: true
    })
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(50)
    usuario: string

    @ApiProperty({
        description: 'Correo del usuario',
        type: String,
        required: true
    })
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(150)
    @IsEmail()
    correo: string

    @ApiProperty({
        description: 'Contrasenia de usuario',
        type: String,
        required: true
    })
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(20)
    contrasenia: string

    @ApiProperty({
        description: 'Id del rol asignado',
        type: Number,
        required: true
    })
    @IsNumber({allowNaN: false})
    @Min(1)
    idRol: number
}