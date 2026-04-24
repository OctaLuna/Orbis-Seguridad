import { ApiProperty } from '@nestjs/swagger';

export class PaginationResponseDto<T> {
    @ApiProperty({
        description: 'Array de elementos de la página actual',
        type: Object,
        isArray: true,
    })
    data: T[];

    @ApiProperty({
        description: 'Número de la página actual',
        type: Number,
        example: 1,
    })
    page: number;

    @ApiProperty({
        description: 'Cantidad de elementos por página',
        type: Number,
        example: 10,
    })
    limit: number;

    @ApiProperty({
        description: 'Cantidad total de páginas disponibles',
        type: Number,
        example: 5,
    })
    pages: number;

    @ApiProperty({
        description: 'Cantidad total de registros encontrados',
        type: Number,
        example: 42,
    })
    total: number;
}