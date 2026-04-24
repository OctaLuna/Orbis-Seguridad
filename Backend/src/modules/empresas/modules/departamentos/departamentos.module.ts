import { Module } from '@nestjs/common';
import { DepartamentosService } from './services/departamentos.service';
import { DepartamentosController } from './api/departamentos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Departamento } from './entities/departamento.entity';
import { DepartamentosStatisticsService } from './services/departamentos-statistics.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([Departamento])
	],
	controllers: [DepartamentosController],
	providers: [
		DepartamentosService,
		DepartamentosStatisticsService,
	],
	exports: [
		DepartamentosService,
		DepartamentosStatisticsService,
	]
})
export class DepartamentosModule { }
