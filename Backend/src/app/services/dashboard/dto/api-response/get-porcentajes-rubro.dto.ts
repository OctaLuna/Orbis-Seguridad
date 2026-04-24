import { ApiProperty } from '@nestjs/swagger';

export class PorcentajeRubro {
    @ApiProperty({
        example: 1,
        description: 'ID único del rubro',
    })
    idRubro: number;

    @ApiProperty({
        example: 'Comercio',
        description: 'Nombre del rubro',
    })
    nombreRubro: string;

    @ApiProperty({
        example: 25,
        description: 'Cantidad total de empresas que pertenecen a este rubro',
    })
    totalEmpresas: number;

    @ApiProperty({
        example: 12.5,
        description: 'Porcentaje de empresas que pertenecen a este rubro respecto al total',
    })
    porcentaje: number;
}

export class GetPorcentajesRubroDto {
    @ApiProperty({
        type: [PorcentajeRubro],
        description: 'Lista de rubros con sus estadísticas de participación',
    })
    rubros: PorcentajeRubro[];
}
