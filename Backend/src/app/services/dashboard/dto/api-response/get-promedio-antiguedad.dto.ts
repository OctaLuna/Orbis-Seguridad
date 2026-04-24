import { ApiProperty } from "@nestjs/swagger";

export class GetPromedioAntiguedadDto {
    @ApiProperty({
        description: 'Premdio de antiguedad',
        type: Number
    })
    promedio: number
}