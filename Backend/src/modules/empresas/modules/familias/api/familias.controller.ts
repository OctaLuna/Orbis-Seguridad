import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FamiliasService } from '../services/familias.service';
import { CreateFamiliaDto } from '../dto/create-familia.dto';
import { UpdateFamiliaDto } from '../dto/update-familia.dto';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController(true)
@Controller('api/familias')
export class FamiliasController {
	constructor(private readonly familiasService: FamiliasService) { }

	@Post()
	create(@Body() createFamiliaDto: CreateFamiliaDto) {
		return this.familiasService.create(createFamiliaDto);
	}

	@Get()
	findAll() {
		return this.familiasService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.familiasService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateFamiliaDto: UpdateFamiliaDto) {
		return this.familiasService.update(+id, updateFamiliaDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.familiasService.remove(+id);
	}
}
