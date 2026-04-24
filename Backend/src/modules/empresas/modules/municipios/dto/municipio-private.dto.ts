import { ApiProperty } from "@nestjs/swagger";

export class MunicipioPrivateDto {
    @ApiProperty({
        description: 'Id del municipio',
        type: Number
    })
    id: number

    @ApiProperty({
        description: 'Nombre del municipio',
        type: String
    })
    nombreMunicipio: string
}