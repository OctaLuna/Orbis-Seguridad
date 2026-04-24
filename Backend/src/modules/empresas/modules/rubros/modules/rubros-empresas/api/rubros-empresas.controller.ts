import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RubrosEmpresasService } from '../services/rubros-empresas.service';
import { CreateRubrosEmpresaDto } from '../dto/create-rubros-empresa.dto';
import { UpdateRubrosEmpresaDto } from '../dto/update-rubros-empresa.dto';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController(true)
@Controller('api/rubros-empresas')
export class RubrosEmpresasController {
	constructor(private readonly rubrosEmpresasService: RubrosEmpresasService) { }

	@Post()
	create(@Body() createRubrosEmpresaDto: CreateRubrosEmpresaDto) {
		return this.rubrosEmpresasService.create(createRubrosEmpresaDto);
	}

	@Get()
	findAll() {
		return this.rubrosEmpresasService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.rubrosEmpresasService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateRubrosEmpresaDto: UpdateRubrosEmpresaDto) {
		return this.rubrosEmpresasService.update(+id, updateRubrosEmpresaDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.rubrosEmpresasService.remove(+id);
	}
}
