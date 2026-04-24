import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RegisterDto } from '../dto/register.dto';
import { Response } from 'express';
import { LoginDto } from '../dto/login.dto';
import { CreatedRes, OkRes } from 'src/common/utils';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { CommonResponseDto } from 'src/shared/dto/common-response.dto';
import { LoginResponseDto } from '../dto/login-response.dto';
import { SwaggerBadRequestCommon } from 'src/common/utils/swagger/swagger-response.utils';

@Controller('api/auth')
export class AuthController {
	constructor(private readonly authService: AuthService) { }

	@Post('/register')
	@ApiOperation({
		summary: 'Api para registrar usuarios como visitantes',
	})
	@ApiCreatedResponse({
		description: 'Respuesta en caso de crear usuario exitosamente',
		type: CommonResponseDto
	})
	@ApiBadRequestResponse(SwaggerBadRequestCommon())
	@ApiConflictResponse({
		description: 'Respuesta en caso de nombre de usuario ya usado',
		type: CommonResponseDto
	})
	async register(@Body() data: RegisterDto,@Res() res: Response){
		const usuario = await this.authService.register(data);
		return CreatedRes(res,{
			message: 'El usuario fue registrado'
		});
	}

	@Post('/login')
	@ApiOperation({
		summary: 'Api iniciar sesion en el sistema'
	})
	@ApiOkResponse({
		description: 'Respuesta en caso de iniciar sesion exitosamente',
		type: LoginResponseDto
	})
	@ApiUnauthorizedResponse({
		description: 'Respuesta en caso de ingresar credenciales incorrectas',
		type: CommonResponseDto
	})
	@ApiBadRequestResponse(SwaggerBadRequestCommon())
	async login(@Body() data: LoginDto,@Res() res: Response){
		const response = await this.authService.login(data);
		return OkRes(res,response);
	}
}
