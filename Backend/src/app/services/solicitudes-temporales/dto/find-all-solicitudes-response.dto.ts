import { ApiProperty } from "@nestjs/swagger";
import { PaginationResponseDto } from "src/shared/dto/pagination-response.dto";
import { SolicitudTemporalDto } from "./solicitud-temporal.dto";
import { PaginatedSolicitudesDto } from "./paginated-solicitudes.dto";

export class FindAllSolicitudesResponseDto {
    @ApiProperty({
        type: PaginatedSolicitudesDto
    })
    solicitudes: PaginatedSolicitudesDto
}