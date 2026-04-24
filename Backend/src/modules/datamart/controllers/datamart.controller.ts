import { Controller, Get, Res } from '@nestjs/common';
import { DatamartService } from '../services/datamart.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { OkRes } from 'src/common/utils';
import { FindAllDatamartResponseDto } from '../dto/outputs/find-all-datamart-response.dto';

@ApiTags('Datamart')
@Controller('datamart')
export class DatamartController {
	constructor(
		private readonly datamartService: DatamartService
	) {}

	@Get()
	@ApiOperation({
		summary: 'Api para obtenre todos los datos del datamart'
	})
	@ApiOkResponse({
		description: 'Repsuesta en caso de obtener todo el datamart',
		type: FindAllDatamartResponseDto
	})
	async findAll(
		@Res() res: Response
	){
		const empresas = await this.datamartService.findAll();
		return OkRes(res,{
			empresas: empresas
		})
	}
}
