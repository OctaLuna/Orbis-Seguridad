// ./dto/create-solicitud-temporal.dto.ts
import {
	IsEmail,
	IsNotEmpty,
	IsOptional,
	IsBoolean,
	MaxLength,
	IsISO8601,
	MinLength
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateSolicitudTemporalDto {
	@ApiProperty({
		description: 'Correo del solicitante, debe ser un email válido',
		example: 'usuario@ejemplo.com',
		maxLength: 150,
	})
	@IsEmail()
	@MaxLength(150)
	correo: string;

	@ApiProperty({
		description: 'Justificación de por qué solicita la cuenta temporal',
		example: 'Necesito acceso temporal para realizar una investigación específica.',
	})
	@IsNotEmpty()
	@MinLength(10)
	@MaxLength(500)
	justificacion: string;

	@ApiProperty({
		description: 'Fecha de uso solicitada (en formato ISO 8601). Se convierte a Date en el service',
		example: '2025-09-23T10:00:00.000Z',
	})
	@IsISO8601({ strict: true })
	fechaUso: string;
}
