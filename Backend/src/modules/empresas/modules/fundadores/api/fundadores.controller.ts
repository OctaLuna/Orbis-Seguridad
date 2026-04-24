import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FundadoresService } from '../services/fundadores.service';
import { CreateFundadoreDto } from '../dto/create-fundadore.dto';
import { UpdateFundadoreDto } from '../dto/update-fundadore.dto';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController(true)
@Controller('api/fundadores')
export class FundadoresController {
	constructor(private readonly fundadoresService: FundadoresService) { }

	@Get()
	findAll() {
		return this.fundadoresService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.fundadoresService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateFundadoreDto: UpdateFundadoreDto) {
		return this.fundadoresService.update(+id, updateFundadoreDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.fundadoresService.remove(+id);
	}
}
