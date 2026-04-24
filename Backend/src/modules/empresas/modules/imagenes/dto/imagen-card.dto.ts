import { ApiProperty } from "@nestjs/swagger";

export class ImagenCardDto {
    @ApiProperty({
        description: 'Id de la imagen de la empresa',
        type: Number
    })
    id: number

    @ApiProperty({
        description: 'Url de la imagen',
        type: String
    })
    url: string
}