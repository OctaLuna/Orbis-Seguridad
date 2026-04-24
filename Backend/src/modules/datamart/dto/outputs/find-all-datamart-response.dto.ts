import { ApiProperty } from "@nestjs/swagger";
import { EmpresaDtDto } from "../empresa-dt.dto";

export class FindAllDatamartResponseDto {
    @ApiProperty({
        description: 'Empresas registradas en el datamart',
        type: [EmpresaDtDto]
    })
    empresas: EmpresaDtDto[]
}