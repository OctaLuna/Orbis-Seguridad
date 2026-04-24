import { PaginationResponseDto } from "src/shared/dto/pagination-response.dto";
import { EmpresaCardDto } from "../empresa-card.dto";
export declare class FindAllEmpresasCardsPaginationResponseDto extends PaginationResponseDto<EmpresaCardDto> {
    data: EmpresaCardDto[];
}
