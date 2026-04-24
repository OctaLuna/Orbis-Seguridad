import { Controller, Get, Res } from '@nestjs/common';
import { AccionesService } from './acciones.service';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { OkRes } from 'src/common/utils'; // Asegúrate de que la ruta a OkRes sea correcta

@ApiTags('Acciones')
@Controller('api/acciones')
export class AccionesController {
  constructor(private readonly accionesService: AccionesService) {}

  @Get()
  async findAll(@Res() res: Response) {
    const acciones = await this.accionesService.findAll();
    return OkRes(res, {
      acciones: acciones,
    });
  }
}