import { Body, Controller, Post, Res } from "@nestjs/common";
import { FormularioService } from "../services/formulario.service";
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreatedRes } from "src/common/utils";
import { Response } from "express";
import { CommonResponseDto } from "src/shared/dto/common-response.dto";
import { SwaggerBadRequestCommon, SwaggerNotFoundCommon } from "src/common/utils";
import { RegisterEmpresaDto } from "../dto/register-empresa.dto";

@ApiTags('Formulario')
@Controller('api/formulario')
export class FormularioController {
    constructor(private readonly formularioService: FormularioService){}

    @Post()
    @ApiOperation({
        summary: 'Api para registrar la empresa mediante el formulario'
    })
    @ApiCreatedResponse({
        description: 'Respuesta en caso de registrar la empresa exitosamente',
        type: CommonResponseDto
    })
    @ApiNotFoundResponse(SwaggerNotFoundCommon())
    @ApiBadRequestResponse(SwaggerBadRequestCommon())
    async registerEmpresa(@Body() data: RegisterEmpresaDto,@Res() res: Response){
        const response = await this.formularioService.registerEmpresa(data);
        return CreatedRes(res,{
            message: 'Se registro la empresa exitosamente'
        });
    }
}