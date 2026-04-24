import { ApiProperty } from '@nestjs/swagger';

export class GetEmpresasAccionesDto {
  @ApiProperty({
    description: 'Porcentaje de empresas que tienen al menos un ods registrado',
    example: 72.5,
    type: Number,
  })
  conAcciones: number;

  @ApiProperty({
    description: 'Porcentaje de empresas que no tienen ningun ods registrado',
    example: 27.5,
    type: Number,
  })
  sinAcciones: number;
}
