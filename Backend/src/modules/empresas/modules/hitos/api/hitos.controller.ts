import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HitosService } from '../services/hitos.service';
import { CreateHitoDto } from '../dto/create-hito.dto';
import { UpdateHitoDto } from '../dto/update-hito.dto';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController(true)
@Controller('api/hitos')
export class HitosController {
	constructor(private readonly hitosService: HitosService) { }

	@Post()
	create(@Body() createHitoDto: CreateHitoDto) {
		return this.hitosService.create(createHitoDto);
	}

	@Get()
	findAll() {
		return this.hitosService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.hitosService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateHitoDto: UpdateHitoDto) {
		return this.hitosService.update(+id, updateHitoDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.hitosService.remove(+id);
	}
}
