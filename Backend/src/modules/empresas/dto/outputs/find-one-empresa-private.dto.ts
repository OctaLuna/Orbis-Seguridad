import { ApiProperty } from "@nestjs/swagger";
import { EmpresaPrivateDto } from "../empresa-private.dto";

export class FindOneEmpresaPrivateDto {
    @ApiProperty({
        description: 'Empresa buscada',
        type: EmpresaPrivateDto
    })
    empresa: EmpresaPrivateDto
}