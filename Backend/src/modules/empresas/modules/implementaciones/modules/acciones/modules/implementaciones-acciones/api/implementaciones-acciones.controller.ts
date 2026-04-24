import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ImplementacionesAccionesService } from '../services/implementaciones-acciones.service';
import { CreateImplementacionesAccioneDto } from '../dto/create-implementaciones-accione.dto';
import { UpdateImplementacionesAccioneDto } from '../dto/update-implementaciones-accione.dto';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController(true)
@Controller('api/implementaciones-acciones')
export class ImplementacionesAccionesController {
	constructor(private readonly implementacionesAccionesService: ImplementacionesAccionesService) { }

	@Post()
	create(@Body() createImplementacionesAccioneDto: CreateImplementacionesAccioneDto) {
		return this.implementacionesAccionesService.create(createImplementacionesAccioneDto);
	}

	@Get()
	findAll() {
		return this.implementacionesAccionesService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.implementacionesAccionesService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateImplementacionesAccioneDto: UpdateImplementacionesAccioneDto) {
		return this.implementacionesAccionesService.update(+id, updateImplementacionesAccioneDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.implementacionesAccionesService.remove(+id);
	}
}
