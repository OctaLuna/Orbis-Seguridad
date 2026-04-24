import { Controller, Get, Res } from '@nestjs/common';
import { PaisesService } from '../services/paises.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { OkRes } from 'src/common/utils';

@ApiTags('Paises')
@Controller('api/paises')
export class PaisesController {
	constructor(private readonly paisesService: PaisesService) { }

	@Get()
	@ApiOperation({
		summary: 'Api para obtener los paises'
	})
	async findAll(@Res() res: Response) {
		const paises = await this.paisesService.findAll();
		return OkRes(res,{
			paises: paises
		});
	}
}
