import { Module } from '@nestjs/common';
import { ImplementacionesAccionesService } from './services/implementaciones-acciones.service';
import { ImplementacionesAccionesController } from './api/implementaciones-acciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImplementacionAccion } from './entities/implementacion-accion.entity';
import { AccionesModule } from '../../acciones.module';
import { ProyectosModule } from '../proyectos/proyectos.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([ImplementacionAccion]),
		AccionesModule,
		ProyectosModule
	],
	controllers: [ImplementacionesAccionesController],
	providers: [ImplementacionesAccionesService],
	exports: [ImplementacionesAccionesService]
})
export class ImplementacionesAccionesModule { }
