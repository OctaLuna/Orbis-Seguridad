// En: src/modules/empresas/modules/acciones/acciones.module.ts

import { Module } from '@nestjs/common';
import { AccionesService } from './acciones.service';
import { AccionesController } from './acciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accion } from './entities/accione.entity';

@Module({

  imports: [TypeOrmModule.forFeature([Accion])],
  controllers: [AccionesController],
  providers: [AccionesService],
})
export class AccionesModule {}