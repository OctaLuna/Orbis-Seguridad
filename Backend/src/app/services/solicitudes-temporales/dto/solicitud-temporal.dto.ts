import { ApiProperty } from '@nestjs/swagger';

export class SolicitudTemporalDto {
    @ApiProperty({
        example: 1,
        description: 'Identificador único de la solicitud temporal',
    })
    id: number;

    @ApiProperty({
        example: 'usuario@correo.com',
        description: 'Correo electrónico asociado a la solicitud',
    })
    correo: string;

    @ApiProperty({
        example: 'Necesito acceso temporal a la oficina para revisión de documentos',
        description: 'Justificación de la solicitud temporal',
    })
    justificacion: string;

    @ApiProperty({
        example: true,
        nullable: true,
        description:
            'Estado de aprobación de la solicitud: `true` (aprobada), `false` (rechazada), `null` (pendiente)',
    })
    esAprobado: boolean | null;

    @ApiProperty({
        example: '2025-09-20T18:00:00.000Z',
        description:
            'Fecha hasta donde se solicita el permiso temporal (fecha de uso)',
    })
    fechaUso: Date;

    @ApiProperty({
        example: '2025-09-17T12:30:00.000Z',
        description: 'Fecha en que se registró la solicitud',
    })
    fecha: Date;
}
