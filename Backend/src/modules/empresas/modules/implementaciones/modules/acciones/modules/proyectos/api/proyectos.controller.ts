import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProyectosService } from '../services/proyectos.service';
import { CreateProyectoDto } from '../dto/create-proyecto.dto';
import { UpdateProyectoDto } from '../dto/update-proyecto.dto';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController(true)
@Controller('api/proyectos')
export class ProyectosController {
	constructor(private readonly proyectosService: ProyectosService) { }

	@Post()
	create(@Body() createProyectoDto: CreateProyectoDto) {
		return this.proyectosService.create(createProyectoDto);
	}

	@Get()
	findAll() {
		return this.proyectosService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.proyectosService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateProyectoDto: UpdateProyectoDto) {
		return this.proyectosService.update(+id, updateProyectoDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.proyectosService.remove(+id);
	}
}
