import { IsString, IsEmail, IsInt, IsNotEmpty, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUsuarioNuevoDto {
    @ApiProperty({ example: 'Juan Carlos' })
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @ApiProperty({ example: 'Pérez López' })
    @IsString()
    @IsNotEmpty()
    apellido: string;

    @ApiProperty({
        example: 'juan.perez@gmail.com',
        description: 'Correo real del usuario. Aquí se enviará la contraseña temporal.',
    })
    @IsEmail()
    correoReal: string;

    @ApiProperty({
        example: 4,
        description: '1=SUPERADMIN, 2=ADMIN_RRHH, 3=ADMIN_EMPRESAS, 4=INV_SENIOR, 5=INV_JUNIOR, 6=TEMPORAL, 7=VISITANTE',
    })
    @IsInt()
    @Min(1)
    @Max(7)
    idRol: number;
}
