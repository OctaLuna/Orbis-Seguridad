import { ApiProperty } from "@nestjs/swagger";

export class FundadorDto {
    @ApiProperty({
        description: 'Id del fundador',
        type: Number
    })
    id: number

    @ApiProperty({
        description: 'Nombre del fundador',
        type: String
    })
    nombre: string
}