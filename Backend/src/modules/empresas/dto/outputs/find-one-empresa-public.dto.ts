import { ApiProperty } from "@nestjs/swagger";
import { EmpresaPublicDto } from "../empresa-public.dto";

export class FindOneEmpresaPublicDto {
    @ApiProperty({
        description: 'Empresa buscada',
        type: EmpresaPublicDto
    })
    empresa: EmpresaPublicDto
}