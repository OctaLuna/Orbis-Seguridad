import { Controller, Get, Post, Body, Patch, Param, Delete, Res, Query } from '@nestjs/common';
import { MunicipiosService } from '../services/municipios.service';
import { CreateMunicipioDto } from '../dto/create-municipio.dto';
import { UpdateMunicipioDto } from '../dto/update-municipio.dto';
import { ApiExcludeController, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { OkRes } from 'src/common/utils';

@ApiTags('Municipios')
@Controller('api/municipios')
export class MunicipiosController {
	constructor(private readonly municipiosService: MunicipiosService) { }

	@Get()
	@ApiOperation({
		summary: 'Api para obtener los municipios'
	})
	@ApiQuery({description: 'Para fultrar municipios por departamentos seleccionados',name: 'idsDepartamentos',type: [Number],required: false})
	async findAll(
		@Query('idsDepartamentos') departamentos: number[],
		@Res() res: Response
	) {
		const municipios = await this.municipiosService.findAll({
			filters: {
				departamentos: departamentos
			}
		});
		return OkRes(res,{
			municipios: municipios
		});
	}
}
