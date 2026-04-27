import {
	Controller,
	Get,
	Patch,
	Delete,
	Post,
	Param,
	Body,
	Res,
	Req,
	ParseIntPipe,
	Put,
	UseGuards,
} from '@nestjs/common';
import { AuthRolesGuard } from 'src/app/services/auth/guards/auth-roles.guard';
import { Rol } from 'src/shared/constants/roles.const';
import { Response } from 'express';
import { CreatedRes, OkRes, SwaggerBadRequestCommon, SwaggerConflictCommon, SwaggerNotFoundCommon } from 'src/common/utils';
import { UsuariosService, CambiarPasswordDto } from '../services/usuarios.service';
import { UsuariosAuthService } from '../services/usuarios-auth.service';
import { PasswordHistoryService } from '../services/password-history.service';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { CreateUsuarioNuevoDto } from '../dto/create-usuario-nuevo.dto';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { FindAllUsuariosDto } from '../dto/find-all-usuarios.dto';
import { CommonResponseDto } from 'src/shared/dto/common-response.dto';

@Controller('api/usuarios')
export class UsuariosController {
	constructor(
		private readonly usuariosService: UsuariosService,
		private readonly usuariosAuthService: UsuariosAuthService,
		private readonly passwordHistoryService: PasswordHistoryService,
	) { }

	@Get()
	@UseGuards(AuthRolesGuard([Rol.ADMIN_RRHH]))
	@ApiOperation({ summary: 'Api para obtener los usuarios (solo admins)' })
	@ApiOkResponse({ description: 'Respuesta en caso de obtener usuarios', type: FindAllUsuariosDto })
	async findAll(@Res() res: Response) {
		const usuarios = await this.usuariosService.findAll();
		return OkRes(res, { usuarios });
	}

	@Post()
	@UseGuards(AuthRolesGuard([Rol.ADMIN_RRHH]))
	@ApiOperation({ summary: 'Api para crear un usuario con alias @orbis.com (solo admins)' })
	@ApiCreatedResponse({ description: 'Usuario creado y credenciales enviadas por correo', type: CommonResponseDto })
	@ApiBadRequestResponse(SwaggerBadRequestCommon())
	async crearUsuario(@Body() dto: CreateUsuarioNuevoDto, @Req() req: any, @Res() res: Response) {
		await this.usuariosAuthService.crearUsuario(dto, req.user.rol);
		return CreatedRes(res, { message: 'Usuario creado exitosamente. Las credenciales fueron enviadas por correo.' });
	}

	@Patch('cambiar-password')
	@UseGuards(AuthRolesGuard([Rol.VISITANTE]))
	@ApiOperation({ summary: 'Api para que el usuario autenticado cambie su propia contraseña' })
	@ApiOkResponse({ description: 'Contraseña actualizada exitosamente', type: CommonResponseDto })
	@ApiBadRequestResponse(SwaggerBadRequestCommon())
	async cambiarPassword(@Body() dto: CambiarPasswordDto, @Req() req: any, @Res() res: Response) {
		await this.usuariosService.cambiarPassword(req.user.sub, dto);
		return OkRes(res, { message: 'Contraseña actualizada exitosamente' });
	}

	@Put(':id')
	@UseGuards(AuthRolesGuard([Rol.ADMIN_RRHH]))
	@ApiOperation({ summary: 'Api para actualizar información de un usuario (solo admins)' })
	@ApiOkResponse({ description: 'Respuesta en caso de actualizar el usuario', type: CommonResponseDto })
	@ApiBadRequestResponse(SwaggerBadRequestCommon())
	@ApiNotFoundResponse(SwaggerNotFoundCommon())
	@ApiConflictResponse(SwaggerConflictCommon())
	@ApiParam({ name: 'id', description: 'Id del usuario' })
	async updateUsuario(
		@Param('id', ParseIntPipe) id: number,
		@Body() dto: UpdateUsuarioDto,
		@Res() res: Response,
	) {
		await this.usuariosAuthService.update(id, dto);
		return OkRes(res, { message: 'El usuario se actualizó exitosamente' });
	}

	@Patch(':id/desbloquear')
	@UseGuards(AuthRolesGuard([Rol.ADMIN_RRHH]))
	@ApiOperation({ summary: 'Api para desbloquear la cuenta de un usuario (solo admins)' })
	@ApiOkResponse({ description: 'Cuenta desbloqueada exitosamente', type: CommonResponseDto })
	@ApiNotFoundResponse(SwaggerNotFoundCommon())
	@ApiParam({ name: 'id', description: 'Id del usuario' })
	async desbloquearCuenta(
		@Param('id', ParseIntPipe) id: number,
		@Res() res: Response,
	) {
		await this.usuariosService.desbloquearCuenta(id);
		return OkRes(res, { message: 'Cuenta desbloqueada exitosamente' });
	}

	@Delete(':id')
	@UseGuards(AuthRolesGuard([Rol.ADMIN_RRHH]))
	@ApiOperation({ summary: 'Api para eliminar a un usuario (solo admins)' })
	@ApiOkResponse({ description: 'Respuesta en caso de eliminar un usuario', type: CommonResponseDto })
	@ApiBadRequestResponse(SwaggerBadRequestCommon())
	@ApiNotFoundResponse(SwaggerNotFoundCommon())
	@ApiParam({ name: 'id', description: 'Id del usuario' })
	async deleteUsuario(
		@Param('id', ParseIntPipe) id: number,
		@Res() res: Response,
	) {
		await this.usuariosAuthService.remove(id);
		return OkRes(res, { message: 'Usuario eliminado' });
	}

	@Get(':id/historial-passwords')
	@UseGuards(AuthRolesGuard([Rol.ADMIN_RRHH]))
	@ApiOperation({ summary: 'Obtener historial de fechas de cambio de contraseña (sin hashes)' })
	@ApiOkResponse({ description: 'Historial de fechas obtenido', type: CommonResponseDto })
	@ApiNotFoundResponse(SwaggerNotFoundCommon())
	@ApiParam({ name: 'id', description: 'Id del usuario' })
	async obtenerHistorialPasswords(
		@Param('id', ParseIntPipe) id: number,
		@Res() res: Response,
	) {
		const usuario = await this.usuariosService.findOne(id, { throwException: true });
		const historial = await this.passwordHistoryService.obtenerHistorialFechas(id);
		return OkRes(res, {
			id_usuario: usuario!.id,
			usuario: usuario!.usuario,
			...historial,
		});
	}
}
