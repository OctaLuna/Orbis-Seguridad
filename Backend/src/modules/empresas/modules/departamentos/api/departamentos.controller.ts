import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { DepartamentosService } from '../services/departamentos.service';
import { CreateDepartamentoDto } from '../dto/create-departamento.dto';
import { UpdateDepartamentoDto } from '../dto/update-departamento.dto';
import { ApiExcludeController, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { OkRes } from 'src/common/utils';

@ApiTags('Departamentos')
@Controller('api/departamentos')
export class DepartamentosController {
	constructor(private readonly departamentosService: DepartamentosService) { }

	@Get()
	async findAll(@Res() res: Response) {
		const departamentos = await this.departamentosService.findAll();
		return OkRes(res,{
			departamentos: departamentos
		});
	}
}
