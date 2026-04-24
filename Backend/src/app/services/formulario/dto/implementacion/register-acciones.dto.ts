// En: src/app/services/formulario/dto/implementacion/register-acciones.dto.ts

import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class RegisterAccion {
    @ApiProperty({
        description: 'Id de la accion seleccionada',
        type: Number
    })
    id: number

    @ApiProperty({
        description: 'Proyecto involucrados con la accion',
        type: [String],
        example: ['proy1','proy2']
    })
    proyectos: string[]
}