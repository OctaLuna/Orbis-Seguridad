import { ApiProperty } from "@nestjs/swagger";

export class RegisterSedeDto {
    @ApiProperty({
        description: 'Id del departamento donde se encuentra la la sede',
        type: Number
    })
    idDepartamento: number

    @ApiProperty({
        description: 'Si la sede es la central de la empresa, sol puede haber una sede central por empresa',
        type: Boolean
    })
    esCentral: boolean
}