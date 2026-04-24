import { ApiProperty } from "@nestjs/swagger";

export class ProyectoDto {
    @ApiProperty({
        description: 'Id del proyecto',
        type: Number
    })
    id: number

    @ApiProperty({
        description: 'Nombre del proyecto',
        type: String
    })
    nombre: string
}