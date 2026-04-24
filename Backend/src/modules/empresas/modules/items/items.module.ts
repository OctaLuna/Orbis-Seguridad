import { Module } from '@nestjs/common';
import { ItemsService } from './services/items.service';
import { ItemsController } from './api/items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([Item])
	],
	controllers: [ItemsController],
	providers: [ItemsService],
	exports: [ItemsService]
})
export class ItemsModule { }
