import { Module } from '@nestjs/common';
import { RubrosEmpresasService } from './services/rubros-empresas.service';
import { RubrosEmpresasController } from './api/rubros-empresas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RubroEmpresa } from './entities/rubro-empresa.entity';
import { RubrosModule } from '../../rubros.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([RubroEmpresa]),
		RubrosModule
	],
	controllers: [RubrosEmpresasController],
	providers: [RubrosEmpresasService],
	exports: [RubrosEmpresasService]
})
export class RubrosEmpresasModule { }
