import { Module } from '@nestjs/common';
import { MunicipiosService } from './services/municipios.service';
import { MunicipiosController } from './api/municipios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Municipio } from './entities/municipio.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([Municipio])
	],
	controllers: [MunicipiosController],
	providers: [MunicipiosService],
	exports: [MunicipiosService]
})
export class MunicipiosModule { }
