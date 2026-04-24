import { Module } from '@nestjs/common';
import { SedesService } from './services/sedes.service';
import { SedesController } from './api/sedes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sede } from './entities/sede.entity';
import { DepartamentosModule } from '../departamentos/departamentos.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([Sede]),
		DepartamentosModule,
	],
	controllers: [SedesController],
	providers: [SedesService],
	exports: [SedesService]
})
export class SedesModule { }
