import { Controller, Get, Res, Query, Param, ParseIntPipe } from '@nestjs/common';
import { EmpresasService } from '../services/empresas.service';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { OkRes, SwaggerBadRequestCommon, SwaggerNotFoundCommon } from 'src/common/utils';
import { FindAllEmpresasCardsParamsDto } from '../dto/inputs/find-all-empresas-cards-params.dto';
import { FindAllEmpresasCardsPaginationResponseDto } from '../dto/outputs/find-all-empresas-cards-pagination-response.dto';
import { FindOneEmpresaPublicDto } from '../dto/outputs/find-one-empresa-public.dto';
import { FindOneEmpresaPrivateDto } from '../dto/outputs/find-one-empresa-private.dto';
import { FindAllEmpresasCardsPublicParamsDto } from '../dto/inputs/find-all-empresas-cards-public-params.dto';

@ApiTags('Empresas')
@Controller('api/empresas')
export class EmpresasController {
	constructor(private readonly empresasService: EmpresasService) { }

	@Get()
	async findAll(@Res() res: Response) {
		const empresas = await this.empresasService.findAll();
		return OkRes(res,{
			empresas: empresas
		})
	}

	@Get('cards/public')
	@ApiOperation({
		summary: 'Api para obtener las empresas para las cards de la pagina web, para usuario sin sesion'
	})
	@ApiOkResponse({
		description: 'Respuesta en caso de obtener las cads de las empresas',
		type: FindAllEmpresasCardsPaginationResponseDto
	})
	@ApiBadRequestResponse(SwaggerBadRequestCommon())
	async findAllCardsPublic(
		@Query() params: FindAllEmpresasCardsPublicParamsDto,
		@Res() res: Response
	){
		const empresas = await this.empresasService.findAllCardsPublic(params);
		return OkRes(res,{
			empresas: empresas
		})
	}

	@Get('cards/private')
	@ApiOperation({
		summary: 'Api para obtener las empresas para las cards de la pagina web, para usuario con sesion'
	})
	@ApiOkResponse({
		description: 'Respuesta en caso de obtener las cads de las empresas',
		type: FindAllEmpresasCardsPaginationResponseDto
	})
	@ApiBadRequestResponse(SwaggerBadRequestCommon())
	async findAllCardsPrivate(
		@Query() params: FindAllEmpresasCardsParamsDto,
		@Res() res: Response
	){
		const empresas = await this.empresasService.findAllCardsPrivate(params);
		return OkRes(res,{
			empresas: empresas
		})
	}

	@Get('public/:idEmpresa')
	@ApiOperation({
		summary: 'Api paara buscar una empresa. para usuaarios sin sesion',
	})
	@ApiOkResponse({
		description: 'Respuesta en caso de encontrar la empresa',
		type: FindOneEmpresaPublicDto
	})
	@ApiNotFoundResponse(SwaggerNotFoundCommon())
	async findOnePublic(
		@Param('idEmpresa',ParseIntPipe) idEmpresa: number,
		@Res() res: Response,
	){
		const empresa = await this.empresasService.findOnePublic(idEmpresa);
		return OkRes(res,{
			empresa: empresa
		})
	}

	@Get('private/:idEmpresa')
	@ApiOperation({
		summary: 'Api paara buscar una empresa. para con sesion',
	})
	@ApiOkResponse({
		description: 'Respuesta en caso de encontrar la empresa',
		type: FindOneEmpresaPrivateDto
	})
	@ApiNotFoundResponse(SwaggerNotFoundCommon())
	async findOnePrivate(
		@Param('idEmpresa',ParseIntPipe) idEmpresa: number,
		@Res() res: Response,
	){
		const empresa = await this.empresasService.findOnePrivate(idEmpresa);
		return OkRes(res,{
			empresa: empresa
		})
	}
}
