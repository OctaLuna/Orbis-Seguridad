import { Module } from '@nestjs/common';
import { MunicipiosEmpresaService } from './services/municipios-empresa.service';
import { MunicipiosEmpresaController } from './api/municipios-empresa.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MunicipioEmpresa } from './entities/municipio-empresa.entity';
import { MunicipiosModule } from '../../municipios.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([MunicipioEmpresa]),
		MunicipiosModule
	],
	controllers: [MunicipiosEmpresaController],
	providers: [MunicipiosEmpresaService],
	exports: [MunicipiosEmpresaService]
})
export class MunicipiosEmpresaModule { }
