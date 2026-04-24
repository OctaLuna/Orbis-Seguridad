import { ApiProperty } from "@nestjs/swagger"

export class ValidationExceptionDto{
    @ApiProperty({
        description: 'Lista de errores a corregir',
        type: [String]
    })
    message: string[]

    @ApiProperty({
        description: 'Nombre del error',
        type: String
    })
    error: string

    @ApiProperty({
        description: 'Codigo de error',
        type: Number
    })
    statusCode: number
}