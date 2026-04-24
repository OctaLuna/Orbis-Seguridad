import { Module } from '@nestjs/common';
import { RubrosService } from './services/rubros.service';
import { RubrosController } from './api/rubros.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rubro } from './entities/rubro.entity';
import { RubrosStatisticsService } from './services/rubros-statistics.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([Rubro])
	],
	controllers: [RubrosController],
	providers: [RubrosService,RubrosStatisticsService],
	exports: [RubrosService,RubrosStatisticsService]
})
export class RubrosModule { }
