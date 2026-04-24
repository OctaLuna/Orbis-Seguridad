import { Module } from '@nestjs/common';
import { TiposAccionesImplementacionesService } from './services/tipos-acciones-implementaciones.service';
import { TiposAccionesImplementacionesController } from './api/tipos-acciones-implementaciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoAccionImplementacion } from './entities/tipo-accion-implementacion.entity';
import { TiposAccionesModule } from '../../tipos-acciones.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([TipoAccionImplementacion]),
		TiposAccionesModule
	],
	controllers: [TiposAccionesImplementacionesController],
	providers: [TiposAccionesImplementacionesService],
	exports: [TiposAccionesImplementacionesService]
})
export class TiposAccionesImplementacionesModule { }
