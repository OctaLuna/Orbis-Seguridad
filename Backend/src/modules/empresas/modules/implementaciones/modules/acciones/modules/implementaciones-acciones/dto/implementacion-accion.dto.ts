import { ApiProperty } from "@nestjs/swagger";
import { AccionDto } from "../../../dto/accion.dto";
import { ProyectoDto } from "../../proyectos/dto/proyecto.dto";

export class ImplementacionAccionDto {
    @ApiProperty({
        description: 'Id de la accion implentada',
        type: Number
    })
    id: number

    @ApiProperty({
        description: 'Implemantacion de acciones',
        type: AccionDto
    })
    accion: AccionDto

    @ApiProperty({
        description: 'Proyectos relacionados a la accion',
        type: [ProyectoDto]
    })
    proyectos: ProyectoDto[]
}