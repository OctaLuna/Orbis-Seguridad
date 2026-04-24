import { Module } from '@nestjs/common';
import { EmpresasTiposSocietariosService } from './services/empresas-tipos-societarios.service';
import { EmpresasTiposSocietariosController } from './api/empresas-tipos-societarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpresaTipoSocietario } from './entities/empresa-tipo-societario.entity';
import { TiposSocietariosModule } from '../../tipos-societarios.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([EmpresaTipoSocietario]),
		TiposSocietariosModule,
	],
	controllers: [EmpresasTiposSocietariosController],
	providers: [EmpresasTiposSocietariosService],
	exports: [EmpresasTiposSocietariosService]
})
export class EmpresasTiposSocietariosModule { }
