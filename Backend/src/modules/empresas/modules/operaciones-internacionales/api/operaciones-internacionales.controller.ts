import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OperacionesInternacionalesService } from '../services/operaciones-internacionales.service';
import { CreateOperacionesInternacionaleDto } from '../dto/create-operaciones-internacionale.dto';
import { UpdateOperacionesInternacionaleDto } from '../dto/update-operaciones-internacionale.dto';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController(true)
@Controller('api/operaciones-internacionales')
export class OperacionesInternacionalesController {
	constructor(private readonly operacionesInternacionalesService: OperacionesInternacionalesService) { }

	@Post()
	create(@Body() createOperacionesInternacionaleDto: CreateOperacionesInternacionaleDto) {
		return this.operacionesInternacionalesService.create(createOperacionesInternacionaleDto);
	}

	@Get()
	findAll() {
		return this.operacionesInternacionalesService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.operacionesInternacionalesService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateOperacionesInternacionaleDto: UpdateOperacionesInternacionaleDto) {
		return this.operacionesInternacionalesService.update(+id, updateOperacionesInternacionaleDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.operacionesInternacionalesService.remove(+id);
	}
}
