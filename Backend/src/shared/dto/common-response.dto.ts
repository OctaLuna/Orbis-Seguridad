import { ApiProperty } from "@nestjs/swagger";

export class CommonResponseDto {
    @ApiProperty({
        description: 'Mensaje de respuesta',
        type: String
    })
    message: string
}