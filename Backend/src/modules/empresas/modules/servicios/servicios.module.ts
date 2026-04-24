import { Module } from '@nestjs/common';
import { ServiciosService } from './services/servicios.service';
import { ServiciosController } from './api/servicios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Servicio } from './entities/servicio.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([Servicio])
	],
	controllers: [ServiciosController],
	providers: [ServiciosService],
	exports: [ServiciosService]
})
export class ServiciosModule { }
