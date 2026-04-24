import { ApiPropertyOptional } from '@nestjs/swagger';
import {
	IsEmail,
	IsInt,
	IsOptional,
	IsString,
	MaxLength,
	MinLength
} from 'class-validator';

export class UpdateUsuarioDto {
	@ApiPropertyOptional({
		description: 'Nombre de usuario (entre 1 y 50 caracteres)',
		example: 'jdoe',
		type: String
	})
	@IsOptional()
	@IsString()
	@MinLength(1)
	@MaxLength(50)
	usuario?: string;

	@ApiPropertyOptional({
		description: 'Contraseña del usuario (mínimo 6 caracteres)',
		example: 'segura123',
		type: String
	})
	@IsOptional()
	@IsString()
	@MinLength(8)
	@MaxLength(20)
	contrasenia?: string;

	@ApiPropertyOptional({
		description: 'Correo electrónico válido',
		example: 'usuario@ejemplo.com',
		type: String
	})
	@IsOptional()
	@IsEmail()
	@MaxLength(150)
	correo?: string;

	@ApiPropertyOptional({
		description: 'ID del rol asignado al usuario',
		example: 2,
		type: String
	})
	@IsOptional()
	@IsInt()
	idRol?: number;
}
