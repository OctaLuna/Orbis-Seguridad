import { ApiProperty } from "@nestjs/swagger";

export class GetEmpresaDepartementoDto {
    @ApiProperty({
        example: 1,
        description: "Identificador único del departamento.",
        type: Number,
    })
    idDepartamento: number;

    @ApiProperty({
        example: "La Paz",
        description: "Nombre del departamento.",
        type: String,
    })
    nombreDepartamento: string;

    @ApiProperty({
        example: 5,
        description: "Cantidad total de empresas que tienen sede central en este departamento.",
        type: Number,
    })
    cantidadEmpresas: number;
}

export class GetEmpresasDepartamentosResponseDto {
    @ApiProperty({
        description: 'Conteos de empresas por departamentos',
        type: [GetEmpresaDepartementoDto]
    })
    departamentos: GetEmpresaDepartementoDto[]
}