import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class ForgotPasswordDto {
    @IsEmail({}, { message: 'Correo inválido' })
    correo: string;
}

export class ResetPasswordDto {
    @IsString() @IsNotEmpty()
    token: string;

    @IsString() @IsNotEmpty()
    passwordNuevo: string;
}

export class ValidarTokenDto {
    @IsString() @IsNotEmpty()
    token: string;
}
