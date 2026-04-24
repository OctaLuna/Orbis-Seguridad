import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AccionesService } from '../services/acciones.service';
import { CreateAccioneDto } from '../dto/create-accione.dto';
import { UpdateAccioneDto } from '../dto/update-accione.dto';
import { ApiExcludeController } from '@nestjs/swagger';
@ApiExcludeController(true)
@Controller('api/acciones')
export class AccionesController {
	constructor(private readonly accionesService: AccionesService) { }

	@Post()
	create(@Body() createAccioneDto: CreateAccioneDto) {
		return this.accionesService.create(createAccioneDto);
	}

	@Get()
	findAll() {
		return this.accionesService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.accionesService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateAccioneDto: UpdateAccioneDto) {
		return this.accionesService.update(+id, updateAccioneDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.accionesService.remove(+id);
	}
}
