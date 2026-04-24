import { Module } from '@nestjs/common';
import { PaisesService } from './services/paises.service';
import { PaisesController } from './api/paises.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pais } from './entities/pais.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([Pais])
	],
	controllers: [PaisesController],
	providers: [PaisesService],
	exports: [PaisesService]
})
export class PaisesModule { }
