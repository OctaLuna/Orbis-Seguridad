import { ApiProperty } from "@nestjs/swagger";

export class GetPromedioSedesDto {
    @ApiProperty({
        description: 'Promedio',
        type: Number
    })
    promedio: number
}