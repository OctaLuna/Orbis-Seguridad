import { ApiProperty } from '@nestjs/swagger';

export class MunicipioDtDto {
    @ApiProperty({ 
        description: 'Identificador único del municipio',
        type: Number
    })
    id: number;

    @ApiProperty({
        description: 'Nombre del municipio donde opera la empresa',
        type: String
    })
    nombre: string;
}
