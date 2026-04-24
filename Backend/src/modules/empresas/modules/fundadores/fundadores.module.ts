import { Module } from '@nestjs/common';
import { FundadoresService } from './services/fundadores.service';
import { FundadoresController } from './api/fundadores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fundador } from './entities/fundador.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([Fundador])
	],
	controllers: [FundadoresController],
	providers: [FundadoresService],
	exports: [FundadoresService]
})
export class FundadoresModule { }
