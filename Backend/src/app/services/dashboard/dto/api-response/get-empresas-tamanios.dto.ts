import { ApiProperty } from "@nestjs/swagger"

export class EmpresaTamanioDto {
    @ApiProperty({
        description: 'Id del tamanio de empresa',
        type: Number,
    })
    idTamanio: number

    @ApiProperty({
        description: 'Nombre del tamanio de empresa',
        type: String
    })
    nombreTamanio: string

    @ApiProperty({
        description: 'Total de empresas relacionadas a este tamanio',
        type: Number
    })
    total: number

    @ApiProperty({
        description: 'Porcentaje'
    })
    porcentaje: number
}

export class GetEmpresasTamaniosDto {
    @ApiProperty({
        description: 'Lista de tamanios con datos estadisticos',
        type: [EmpresaTamanioDto]
    })
    tamanios: EmpresaTamanioDto[]
}