import { Module } from '@nestjs/common';
import { TiposAccionesService } from './services/tipos-acciones.service';
import { TiposAccionesController } from './api/tipos-acciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoAccion } from './entities/tipo-accion.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([TipoAccion])
	],
	controllers: [TiposAccionesController],
	providers: [TiposAccionesService],
	exports: [TiposAccionesService]
})
export class TiposAccionesModule { }
