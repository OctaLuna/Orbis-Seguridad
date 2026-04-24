import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TiposAccionesImplementacionesService } from '../services/tipos-acciones-implementaciones.service';
import { CreateTiposAccionesImplementacioneDto } from '../dto/create-tipos-acciones-implementacione.dto';
import { UpdateTiposAccionesImplementacioneDto } from '../dto/update-tipos-acciones-implementacione.dto';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController(true)
@Controller('api/tipos-acciones-implementaciones')
export class TiposAccionesImplementacionesController {
	constructor(private readonly tiposAccionesImplementacionesService: TiposAccionesImplementacionesService) { }

	@Post()
	create(@Body() createTiposAccionesImplementacioneDto: CreateTiposAccionesImplementacioneDto) {
		return this.tiposAccionesImplementacionesService.create(createTiposAccionesImplementacioneDto);
	}

	@Get()
	findAll() {
		return this.tiposAccionesImplementacionesService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.tiposAccionesImplementacionesService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateTiposAccionesImplementacioneDto: UpdateTiposAccionesImplementacioneDto) {
		return this.tiposAccionesImplementacionesService.update(+id, updateTiposAccionesImplementacioneDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.tiposAccionesImplementacionesService.remove(+id);
	}
}
