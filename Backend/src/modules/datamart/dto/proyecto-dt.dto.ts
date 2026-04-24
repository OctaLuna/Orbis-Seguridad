import { ApiProperty } from '@nestjs/swagger';

export class ProyectoDtDto {
    @ApiProperty({ description: 'Identificador único del proyecto', type: Number })
    id: number;

    @ApiProperty({ description: 'Nombre del proyecto', type: String })
    nombre: string;
}