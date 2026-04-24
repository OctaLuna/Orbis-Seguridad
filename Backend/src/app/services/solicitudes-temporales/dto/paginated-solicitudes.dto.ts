import { ApiProperty } from '@nestjs/swagger';
import { SolicitudTemporalDto } from './solicitud-temporal.dto';
import { PaginationResponseDto } from 'src/shared/dto/pagination-response.dto';

export class PaginatedSolicitudesDto extends PaginationResponseDto<SolicitudTemporalDto> {
    @ApiProperty({ type: SolicitudTemporalDto, isArray: true })
    declare data: SolicitudTemporalDto[];
}
