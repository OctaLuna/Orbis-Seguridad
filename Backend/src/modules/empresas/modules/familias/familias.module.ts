import { Module } from '@nestjs/common';
import { FamiliasService } from './services/familias.service';
import { FamiliasController } from './api/familias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Familia } from './entities/familia.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([Familia])
	],
	controllers: [FamiliasController],
	providers: [FamiliasService],
	exports: [FamiliasService]
})
export class FamiliasModule { }
