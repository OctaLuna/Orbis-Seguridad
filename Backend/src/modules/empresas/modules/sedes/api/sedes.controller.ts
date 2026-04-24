import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SedesService } from '../services/sedes.service';
import { CreateSedeDto } from '../dto/create-sede.dto';
import { UpdateSedeDto } from '../dto/update-sede.dto';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController(true)
@Controller('api/sedes')
export class SedesController {
	constructor(private readonly sedesService: SedesService) { }

	@Post()
	create(@Body() createSedeDto: CreateSedeDto) {
		return this.sedesService.create(createSedeDto);
	}

	@Get()
	findAll() {
		return this.sedesService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.sedesService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateSedeDto: UpdateSedeDto) {
		return this.sedesService.update(+id, updateSedeDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.sedesService.remove(+id);
	}
}
