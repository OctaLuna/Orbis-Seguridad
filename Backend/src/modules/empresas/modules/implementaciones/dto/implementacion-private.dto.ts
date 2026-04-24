import { ApiProperty } from "@nestjs/swagger";
import { ImplementacionAccionDto } from "../modules/acciones/modules/implementaciones-acciones/dto/implementacion-accion.dto";
import { TipoAccionDto } from "../modules/tipos-acciones/dto/tipo-accion.dto";

export class ImplementacionPrivateDto {
    @ApiProperty({
        description: 'Id de la implemantacion de la empresas',
        type: Number
    })
    id: number

    @ApiProperty({
        description: 'Anio de implementacion',
        type: Number
    })
    anio: number

    @ApiProperty({
        description: 'Implemantaciones de acciones',
        type: [ImplementacionAccionDto]
    })
    implementacionesAcciones: ImplementacionAccionDto

    @ApiProperty({
        description: 'Tipos de acciones relacionada',
        type: [TipoAccionDto]
    })
    tiposAcciones: TipoAccionDto[]
}