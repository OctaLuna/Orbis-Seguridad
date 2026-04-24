import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ImplementacionesService } from '../services/implementaciones.service';
import { CreateImplementacioneDto } from '../dto/create-implementacione.dto';
import { UpdateImplementacioneDto } from '../dto/update-implementacione.dto';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController(true)
@Controller('api/implementaciones')
export class ImplementacionesController {
	constructor(private readonly implementacionesService: ImplementacionesService) { }

	@Post()
	create(@Body() createImplementacioneDto: CreateImplementacioneDto) {
		return this.implementacionesService.create(createImplementacioneDto);
	}

	@Get()
	findAll() {
		return this.implementacionesService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.implementacionesService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateImplementacioneDto: UpdateImplementacioneDto) {
		return this.implementacionesService.update(+id, updateImplementacioneDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.implementacionesService.remove(+id);
	}
}
