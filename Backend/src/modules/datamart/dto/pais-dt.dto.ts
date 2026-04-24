import { ApiProperty } from '@nestjs/swagger';

export class PaisDtDto {
    @ApiProperty({
        description: 'Identificador único del país',
        type: Number
    })
    id: number;

    @ApiProperty({
        description: 'Nombre del país donde opera la empresa',
        type: String
    })
    nombre: string;
}
