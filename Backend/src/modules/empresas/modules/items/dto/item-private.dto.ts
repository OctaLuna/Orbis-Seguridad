import { ApiProperty } from "@nestjs/swagger";

export class ItemPrivateDto {
    @ApiProperty({
        description: 'Id del item de la empresa',
        type: Number
    })
    id: number

    @ApiProperty({
        description: 'Nombre del item',
        type: String
    })
    nombre: string
}