import { ApiProperty } from "@nestjs/swagger";
import { number } from "joi";

export class RegisterFamiliaDto {
    @ApiProperty({
        description: 'Registra si la empresa es familiar, true = si,false = no',
        type: Boolean
    })
    esFamiliar: boolean

    @ApiProperty({
        description: 'Anio que la familia dejo de ser familiar',
        type: Number,
        nullable: true
    })
    anioDejo: number
}