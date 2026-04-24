import { Module } from '@nestjs/common';
import { OperacionesInternacionalesService } from './services/operaciones-internacionales.service';
import { OperacionesInternacionalesController } from './api/operaciones-internacionales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperacionInternacional } from './entities/operacion-internacional.entity';
import { PaisesModule } from '../paises/paises.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([OperacionInternacional]),
		PaisesModule
	],
	controllers: [OperacionesInternacionalesController],
	providers: [OperacionesInternacionalesService],
	exports: [OperacionesInternacionalesService]
})
export class OperacionesInternacionalesModule { }
