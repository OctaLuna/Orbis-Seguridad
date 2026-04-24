import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ImagenesService } from '../services/imagenes.service';
import { CreateImageneDto } from '../dto/create-imagene.dto';
import { UpdateImageneDto } from '../dto/update-imagene.dto';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController(true)
@Controller('api/imagenes')
export class ImagenesController {
	constructor(private readonly imagenesService: ImagenesService) { }

	@Post()
	create(@Body() createImageneDto: CreateImageneDto) {
		return this.imagenesService.create(createImageneDto);
	}

	@Get()
	findAll() {
		return this.imagenesService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.imagenesService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateImageneDto: UpdateImageneDto) {
		return this.imagenesService.update(+id, updateImageneDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.imagenesService.remove(+id);
	}
	//Nuevo método para obtener imágenes por idEmpresa
	 @Get('empresa/:idEmpresa')
  getByEmpresa(@Param('idEmpresa') idEmpresa: string) {
    return this.imagenesService.getByEmpresaId(+idEmpresa);
  }
}
