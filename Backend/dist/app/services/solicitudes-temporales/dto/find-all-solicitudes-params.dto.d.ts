import { PaginationParamsDto } from "src/shared/dto/pagination-params.dto";
export declare class FindAllSolicitudesParamsDto extends PaginationParamsDto {
    esAprobado?: boolean;
    correo?: string;
    orderFecha: "ASC" | "DESC";
    fechaDesde?: Date;
    fechaHasta?: Date;
}
