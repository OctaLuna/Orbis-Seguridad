import { ApiProperty } from "@nestjs/swagger";

export class TotalHitosAnio {
    @ApiProperty({
        description: 'Anio de los hitos',
        type: Number
    })
    anio: number

    @ApiProperty({
        description: 'Total de hitos en el anio',
        type: Number
    })
    total: number
}

export class GetTotalHitosAnio {
    @ApiProperty({
        description: 'Lista de anio con total de hitos',
        type: [TotalHitosAnio]
    })
    hitos: TotalHitosAnio[]
}