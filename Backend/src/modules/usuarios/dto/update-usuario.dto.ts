import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsInt, IsOptional, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

export class UpdateUsuarioDto {
	@ApiPropertyOptional({ description: 'Nombre de usuario', example: 'jdoe' })
	@IsOptional()
	@IsString()
	@MinLength(1)
	@MaxLength(50)
	usuario?: string;

	@ApiPropertyOptional({ description: 'Correo electrónico válido', example: 'usuario@ejemplo.com' })
	@IsOptional()
	@IsEmail()
	@MaxLength(150)
	correo?: string;

	@ApiPropertyOptional({ description: 'ID del rol (1-5)', example: 3 })
	@IsOptional()
	@IsInt()
	@Min(1)
	@Max(5)
	idRol?: number;
}
