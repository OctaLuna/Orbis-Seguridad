import { ApiProperty } from "@nestjs/swagger"

class EmpresasAnio {
    @ApiProperty({
        description: 'Anio',
        type: Number
    })
    anio: number

    @ApiProperty({
        description: 'Total de empresas',
        type: Number
    })
    total: number
}

export class GetEmpresasAnio {
    @ApiProperty({
        description: 'Lista de empresas de cada anio',
        type: [EmpresasAnio]
    })
    empresasAnio: EmpresasAnio[]
}