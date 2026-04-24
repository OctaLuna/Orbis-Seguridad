import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, Min, IsOptional } from "class-validator";

export class PaginationParamsDto {
    @ApiPropertyOptional({
        description: "Número de la página (empieza en 1). Si no se envía, se toma por defecto el valor 1.",
        example: 2,
        default: 1,
    })
    @IsOptional()
    @Type(() => Number) // convierte string del query a number
    @IsInt({ message: "El parámetro 'page' debe ser un número entero" })
    @Min(1, { message: "El parámetro 'page' debe ser mayor o igual a 1" })
    page: number = 1;

    @ApiPropertyOptional({
        description: "Cantidad de resultados por página. Si no se envía, se toma por defecto el valor 10.",
        example: 20,
        default: 10,
    })
    @IsOptional()
    @Type(() => Number)
    @IsInt({ message: "El parámetro 'limit' debe ser un número entero" })
    @Min(1, { message: "El parámetro 'limit' debe ser mayor o igual a 1" })
    limit: number = 10;
}
