import { Type, Transform } from "class-transformer";
import { IsOptional, IsString, IsNumber, Min } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { PaginationParamsDto } from "src/shared/dto/pagination-params.dto";

export class FindAllEmpresasCardsPublicParamsDto extends PaginationParamsDto {
    @ApiPropertyOptional({
        description:
            'Nombre comercial de la empresa (búsqueda parcial, no sensible a mayúsculas).',
        type: String,
        example: 'TecnoSur',
    })
    @IsOptional()
    @IsString()
    nombre?: string;
}
