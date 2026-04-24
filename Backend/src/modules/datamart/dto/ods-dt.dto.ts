import { ApiProperty } from '@nestjs/swagger';
import { ProyectoDtDto } from './proyecto-dt.dto';

export class OdsDtDto {
    @ApiProperty({
        description: 'Identificador único del ODS',
        type: Number
    })
    id: number;

    @ApiProperty({ 
        description: 'Nombre del Objetivo de Desarrollo Sostenible',
        type: String
    })
    nombre: string;

    @ApiProperty({
        description: 'Lista de proyectos asociados a este ODS',
        type: [ProyectoDtDto],
    })
    proyectos: ProyectoDtDto[];
}
