import { Module } from '@nestjs/common';
import { HitosService } from './services/hitos.service';
import { HitosController } from './api/hitos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hito } from './entities/hito.entity';
import { HitosStatisticService } from './services/hitos-statistic.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([Hito])
	],
	controllers: [HitosController],
	providers: [HitosService,HitosStatisticService],
	exports: [HitosService,HitosStatisticService]
})
export class HitosModule { }
