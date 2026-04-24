import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsInt, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UsuarioDto {
	@ApiProperty({
		description: 'Identificador único del usuario',
		example: 1,
	})
	@IsInt()
	id: number;

	@ApiProperty({
		description: 'Nombre de usuario (mínimo 1, máximo 50 caracteres)',
		example: 'jdoe',
	})
	usuario: string;

	@ApiProperty({
		description: 'Correo electrónico del usuario',
		example: 'usuario@ejemplo.com',
	})
	correo: string;

	@ApiProperty({
		description: 'ID del rol asignado al usuario',
		example: 2,
	})
	idRol: number;

	@ApiProperty({
		description: 'Fecha de expiración de la cuenta (puede ser nula)',
		example: '2025-12-31T23:59:59.000Z',
		required: false,
	})
	expiracion?: Date;
}
