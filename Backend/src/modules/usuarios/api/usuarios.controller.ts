import {
	Controller,
	Get,
	Patch,
	Delete,
	Param,
	Body,
	Res,
	ParseIntPipe,
	Put,
} from '@nestjs/common';
import { Response } from 'express';
import { OkRes, SwaggerBadRequestCommon, SwaggerConflictCommon, SwaggerNotFoundCommon } from 'src/common/utils';
import { UsuariosService } from '../services/usuarios.service';
import { UsuariosAuthService } from '../services/usuarios-auth.service';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { ApiBadRequestResponse, ApiConflictResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { FindAllUsuariosDto } from '../dto/find-all-usuarios.dto';
import { CommonResponseDto } from 'src/shared/dto/common-response.dto';

@Controller('api/usuarios')
export class UsuariosController {
	constructor(
		private readonly usuariosService: UsuariosService,
		private readonly usuariosAuthService: UsuariosAuthService,
	) { }

	@Get()
	@ApiOperation({
		summary: 'Api para obtener lso usuarios'
	})
	@ApiOkResponse({
		description: 'Respuesta en caso de obtener usuarios',
		type: FindAllUsuariosDto
	})
	async findAll(@Res() res: Response) {
		const usuarios = await this.usuariosService.findAll();
		return OkRes(res,{
			usuarios: usuarios
		});
	}

	@Put(':id')
	@ApiOperation({
		summary: 'Api para actualizar infomacin de un usuario'
	})
	@ApiOkResponse({
		description: 'Respuesta en caso de actualizar el usuario',
		type: CommonResponseDto
	})
	@ApiBadRequestResponse(SwaggerBadRequestCommon())
	@ApiNotFoundResponse(SwaggerNotFoundCommon())
	@ApiConflictResponse(SwaggerConflictCommon())
	@ApiParam({name: 'id',description: 'Id del usuario'})
	async updateUsuario(
		@Param('id', ParseIntPipe) id: number,
		@Body() dto: UpdateUsuarioDto,
		@Res() res: Response,
	) {
		const usuario = await this.usuariosAuthService.update(id, dto);
		return OkRes(res, {
			message: 'El usuario se actualizo exitosamente'
		});
	}

	@Delete(':id')
	@ApiOperation({
		summary: 'Api para eliminar a un usuario'
	})
	@ApiOkResponse({
		description: 'Respuesta en caso de eliminar un usuario',
		type: CommonResponseDto
	})
	@ApiBadRequestResponse(SwaggerBadRequestCommon())
	@ApiNotFoundResponse(SwaggerNotFoundCommon())
	@ApiParam({name: 'id',description: 'Id del usuario'})
	async deleteUsuario(
		@Param('id', ParseIntPipe) id: number,
		@Res() res: Response,
	) {
		const result = await this.usuariosAuthService.remove(id);
		return OkRes(res,{
			message: 'Usuario eliminado'
		});
	}
}
