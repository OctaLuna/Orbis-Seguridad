import { Module } from '@nestjs/common';
import { TamaniosEmpresasService } from './services/tamanios-empresas.service';
import { TamaniosEmpresasController } from './api/tamanios-empresas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TamanioEmpresa } from './entities/tamanio-empresa.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([TamanioEmpresa])
	],
	controllers: [TamaniosEmpresasController],
	providers: [TamaniosEmpresasService],
	exports: [TamaniosEmpresasService]
})
export class TamaniosEmpresasModule { }
