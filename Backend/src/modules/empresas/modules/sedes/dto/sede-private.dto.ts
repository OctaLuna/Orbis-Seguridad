import { ApiProperty } from "@nestjs/swagger";
import { DepartamentoPublicDto } from "../../departamentos/dto/departamento-public.dto";

export class SedePrivateDto {
    @ApiProperty({
        description: 'Id de la sede de la empresa',
        type: Number
    })
    id: number

    @ApiProperty({
        description: 'Departamento de la sede',
        type: DepartamentoPublicDto
    })
    departamento: DepartamentoPublicDto

    @ApiProperty({
        description: 'Define si la sede es central',
        type: Boolean
    })
    esCentral: boolean
}