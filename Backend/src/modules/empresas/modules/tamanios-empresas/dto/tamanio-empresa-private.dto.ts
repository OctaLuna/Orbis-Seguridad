import { ApiProperty } from "@nestjs/swagger";

export class TamanioEmpresaPrivateDto {
    @ApiProperty({
        description: 'Id del tipo de empresa',
        type: Number
    })
    id: number

    @ApiProperty({
        description: 'Nombre del tamanio de empresa',
        type: String
    })
    nombre: string
}