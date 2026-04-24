import { ApiProperty } from "@nestjs/swagger";

export class SedeDtDto {
    @ApiProperty({ description: 'Identificador único de la sede', type: Number })
    id: number;

    @ApiProperty({ description: 'Nombre de la sede', type: String })
    nombre: string;
}