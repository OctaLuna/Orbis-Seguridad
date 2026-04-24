import { ApiProperty } from "@nestjs/swagger";

export class FamiliaPrivateDto {
    @ApiProperty({
        description: 'Id de familiar',
        type: Number
    })
    id: number

    @ApiProperty({
        description: 'Define si es familiar',
        type: Boolean
    })
    esFamiliar: true

    @ApiProperty({
        description: 'Fecha si es que alguna vez fue familiar',
        type: Number,
        nullable: true
    })
    anio: number
}