// En: src/app/services/formulario/dto/implementacion/register-implementacion.dto.ts

import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, ValidateNested } from "class-validator";
import { RegisterAccion } from "./register-acciones.dto";

export class RegisterImplementacionDto {
    @ApiProperty({
        description: 'Tipo de accion seleccionados,max 2',
        type: [Number],
        example: [1,2]
    })
    tiposAccion: number[]

    @ApiProperty({
        description: 'Anio de implementacion de estas acciones',
        type: Number
    })
    anio: number

    @ApiProperty({
        description: 'Acciones realizadas',
        type: [RegisterAccion]
    })
    acciones: RegisterAccion[]
}