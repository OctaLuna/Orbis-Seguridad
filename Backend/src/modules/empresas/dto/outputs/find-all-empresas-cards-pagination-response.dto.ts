import { PaginationResponseDto } from "src/shared/dto/pagination-response.dto";
import { Empresa } from "../../entities/empresa.entity";
import { ApiProperty } from "@nestjs/swagger";
import { EmpresaCardDto } from "../empresa-card.dto";

export class FindAllEmpresasCardsPaginationResponseDto extends PaginationResponseDto<EmpresaCardDto> {
    @ApiProperty({
        description: 'Array de elementos de la página actual',
        type: EmpresaCardDto,
        isArray: true,
    })
    declare data: EmpresaCardDto[];
}