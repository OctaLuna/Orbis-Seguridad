import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsOptional, IsBoolean } from "class-validator";

export class GetStatisticsParamsDto {
    @ApiPropertyOptional({
        description: 'Indica si solo se consideran empresas con al menos una familia registrada',
        type: Boolean,
        required: false,
        example: true,
    })
    @IsOptional()
    @Transform(({ value }) => value === 'true' || value === true)
    @IsBoolean()
    familiar: boolean = false;
}