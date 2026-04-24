import { Module } from '@nestjs/common';
import { ImagenesService } from './services/imagenes.service';
import { ImagenesController } from './api/imagenes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Imagen } from './entities/imagen.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([Imagen])
	],
	controllers: [ImagenesController],
	providers: [ImagenesService],
	exports: [ImagenesService]
})
export class ImagenesModule { }
