import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { RubrosService } from '../services/rubros.service';
import { CreateRubroDto } from '../dto/create-rubro.dto';
import { UpdateRubroDto } from '../dto/update-rubro.dto';
import { ApiExcludeController, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { OkRes } from 'src/common/utils';

@ApiTags('Rubros')
@Controller('api/rubros')
export class RubrosController {
	constructor(private readonly rubrosService: RubrosService) { }

	@Get()
	@ApiOperation({
		summary: 'Api para obtener los rubros seleccinables'
	})
	@ApiOkResponse({
		description: 'Respuesta en caso de obtener los rubros exitosamente',
	})
	async findAll(@Res() res: Response) {
		const rubros = await this.rubrosService.findAll();
		return OkRes(res,{
			rubros: rubros
		});
	}
}
