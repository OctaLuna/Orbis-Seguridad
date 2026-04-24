import { ApiProperty } from "@nestjs/swagger";

export class DepartamentoPublicDto {
    @ApiProperty({
        description: 'Id del departamento',
        type: Number
    })
    id: number

    @ApiProperty({
        description: 'Nombre del departamento',
        type: String
    })
    nombre: string
}