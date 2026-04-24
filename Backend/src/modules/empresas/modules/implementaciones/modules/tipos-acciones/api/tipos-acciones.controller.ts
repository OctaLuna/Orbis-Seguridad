import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TiposAccionesService } from '../services/tipos-acciones.service';
import { CreateTiposAccioneDto } from '../dto/create-tipos-accione.dto';
import { UpdateTiposAccioneDto } from '../dto/update-tipos-accione.dto';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController(true)
@Controller('api/tipos-acciones')
export class TiposAccionesController {
	constructor(private readonly tiposAccionesService: TiposAccionesService) { }

	@Post()
	create(@Body() createTiposAccioneDto: CreateTiposAccioneDto) {
		return this.tiposAccionesService.create(createTiposAccioneDto);
	}

	@Get()
	findAll() {
		return this.tiposAccionesService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.tiposAccionesService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateTiposAccioneDto: UpdateTiposAccioneDto) {
		return this.tiposAccionesService.update(+id, updateTiposAccioneDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.tiposAccionesService.remove(+id);
	}
}
