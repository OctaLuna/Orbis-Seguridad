import { Module } from '@nestjs/common';
import { ImplementacionesService } from './services/implementaciones.service';
import { ImplementacionesController } from './api/implementaciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Implementacion } from './entities/implementacion.entity';
import { TiposAccionesImplementacionesModule } from './modules/tipos-acciones/modules/tipos-acciones-implementaciones/tipos-acciones-implementaciones.module';
import { ImplementacionesAccionesModule } from './modules/acciones/modules/implementaciones-acciones/implementaciones-acciones.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([Implementacion]),
		TiposAccionesImplementacionesModule,
		ImplementacionesAccionesModule
	],
	controllers: [ImplementacionesController],
	providers: [ImplementacionesService],
	exports: [ImplementacionesService]
})
export class ImplementacionesModule { }
