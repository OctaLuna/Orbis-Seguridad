import { SolicitudTemporalDto } from './solicitud-temporal.dto';
import { PaginationResponseDto } from 'src/shared/dto/pagination-response.dto';
export declare class PaginatedSolicitudesDto extends PaginationResponseDto<SolicitudTemporalDto> {
    data: SolicitudTemporalDto[];
}
