import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsInt, IsBoolean } from "class-validator";
import { GetStatisticsParamsDto } from "../get-statistics-params.dto";

export class GetEmpresasAnioParamsDto extends GetStatisticsParamsDto{
    @ApiPropertyOptional({
        description: 'Anio inicial para filtrar las empresas',
        type: Number,
        required: false,
        example: 2015,
    })
    @Type(() => Number)
    @IsInt()
    inicio: number = NaN;

    @ApiPropertyOptional({
        description: 'Anio final para filtrar las empresas',
        type: Number,
        required: false,
        example: 2024,
    })
    @Type(() => Number)
    @IsInt()
    fin: number = NaN;
}