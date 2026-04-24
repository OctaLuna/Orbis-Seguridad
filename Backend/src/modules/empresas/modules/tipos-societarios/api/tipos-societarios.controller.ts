import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { TiposSocietariosService } from '../services/tipos-societarios.service';
import { CreateTiposSocietarioDto } from '../dto/create-tipos-societario.dto';
import { UpdateTiposSocietarioDto } from '../dto/update-tipos-societario.dto';
import { ApiExcludeController, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { OkRes } from 'src/common/utils';

@ApiTags('Tipos de societarios')
@Controller('api/tipos-societarios')
export class TiposSocietariosController {
	constructor(private readonly tiposSocietariosService: TiposSocietariosService) { }

	@Get()
	@ApiOperation({
		summary: 'Api para obtener los tipos de societarios'
	})
	@ApiOkResponse({
		description: 'Respuesta en caso de obtener los tipos de societario exitosamente'
	})
	async findAll(@Res() res: Response) {
		const ts = await this.tiposSocietariosService.findAll();
		return OkRes(res,{
			tiposSocietarios: ts
		});
	}
}
