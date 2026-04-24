import { Module } from '@nestjs/common';
import { AccionesService } from './services/acciones.service';
import { AccionesController } from './api/acciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accion } from './entities/accion.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([Accion])
	],
	controllers: [AccionesController],
	providers: [AccionesService],
	exports: [AccionesService]
})
export class AccionesModule { }
