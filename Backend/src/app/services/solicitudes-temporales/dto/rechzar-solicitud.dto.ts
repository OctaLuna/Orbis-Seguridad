import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class RechazarSolicitudDto {
    @ApiProperty({
        description: 'Motivo por el cual se rechaza la solicitud',
        type: String
    })
    @IsNotEmpty()
    @MinLength(5)
    @MaxLength(200)
    motivo: string
}