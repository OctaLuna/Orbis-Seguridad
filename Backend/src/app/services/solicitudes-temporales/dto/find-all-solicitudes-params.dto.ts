import { ApiPropertyOptional } from "@nestjs/swagger";
import { PaginationParamsDto } from "src/shared/dto/pagination-params.dto";
import { IsBoolean, IsEmail, IsIn, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class FindAllSolicitudesParamsDto extends PaginationParamsDto {
    @ApiPropertyOptional({
        description:
            "Filtrar por estado de solicitud. Valores posibles: `true` = Aprobadas, `false` = Rechazadas, si no se envía se devuelven todas.",
        example: true,
        nullable: true,
    })
    @IsOptional()
    @Type(() => Boolean)
    @IsBoolean({ message: "El parámetro 'esAprobado' debe ser true o false" })
    esAprobado?: boolean;

    @ApiPropertyOptional({
        description:
            "Filtrar por correo del solicitante. No es obligatorio, pero si se envía debe ser un correo válido.",
        example: "usuario@ejemplo.com",
    })
    @IsOptional()
    @IsEmail({}, { message: "El parámetro 'correo' debe ser un email válido" })
    correo?: string;

    @ApiPropertyOptional({
        description:
            "Ordenar resultados por fecha de solicitud (`fecha`). Valores posibles: 'ASC' o 'DESC'.",
        example: "DESC",
        default: "DESC",
    })
    @IsOptional()
    @IsIn(["ASC", "DESC"], {
        message: "El parámetro 'orderFecha' solo puede ser 'ASC' o 'DESC'",
    })
    orderFecha: "ASC" | "DESC" = "DESC";

    @ApiPropertyOptional({
        description:
            "Filtrar solicitudes desde esta fecha (incluida). Formato: YYYY-MM-DD.",
        example: "2025-01-01",
    })
    @IsOptional()
    @Type(() => Date)
    fechaDesde?: Date;

    @ApiPropertyOptional({
        description:
            "Filtrar solicitudes hasta esta fecha (incluida). Formato: YYYY-MM-DD.",
        example: "2025-12-31",
    })
    @IsOptional()
    @Type(() => Date)
    fechaHasta?: Date;
}
