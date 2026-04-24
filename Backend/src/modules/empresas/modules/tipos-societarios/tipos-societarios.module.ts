import { Module } from '@nestjs/common';
import { TiposSocietariosService } from './services/tipos-societarios.service';
import { TiposSocietariosController } from './api/tipos-societarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoSocietario } from './entities/tipo-societario.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([TipoSocietario])
	],
	controllers: [TiposSocietariosController],
	providers: [TiposSocietariosService],
	exports: [TiposSocietariosService]
})
export class TiposSocietariosModule { }
