import { Module } from '@nestjs/common';
import { PremiosService } from './services/premios.service';
import { PremiosController } from './api/premios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Premio } from './entities/premio.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([Premio])
	],
	controllers: [PremiosController],
	providers: [PremiosService],
	exports: [PremiosService]
})
export class PremiosModule { }
