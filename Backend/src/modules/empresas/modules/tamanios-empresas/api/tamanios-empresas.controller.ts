import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { TamaniosEmpresasService } from '../services/tamanios-empresas.service';
import { CreateTamaniosEmpresaDto } from '../dto/create-tamanios-empresa.dto';
import { UpdateTamaniosEmpresaDto } from '../dto/update-tamanios-empresa.dto';
import { ApiExcludeController, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { OkRes } from 'src/common/utils';

@ApiTags('Tamanios de empresas')
@Controller('api/tamanios-empresas')
export class TamaniosEmpresasController {
	constructor(private readonly tamaniosEmpresasService: TamaniosEmpresasService) { }

	@Get()
	async findAll(@Res() res: Response) {
		const tamaniosEmpresas = await this.tamaniosEmpresasService.findAll();
		return OkRes(res,{
			tamaniosEmpresas: tamaniosEmpresas
		});
	}
}
