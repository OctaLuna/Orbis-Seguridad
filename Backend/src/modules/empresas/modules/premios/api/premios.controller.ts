import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PremiosService } from '../services/premios.service';
import { CreatePremioDto } from '../dto/create-premio.dto';
import { UpdatePremioDto } from '../dto/update-premio.dto';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController(true)
@Controller('api/premios')
export class PremiosController {
	constructor(private readonly premiosService: PremiosService) { }

	@Post()
	create(@Body() createPremioDto: CreatePremioDto) {
		return this.premiosService.create(createPremioDto);
	}

	@Get()
	findAll() {
		return this.premiosService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.premiosService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updatePremioDto: UpdatePremioDto) {
		return this.premiosService.update(+id, updatePremioDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.premiosService.remove(+id);
	}
}
