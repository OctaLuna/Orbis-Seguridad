import { Controller, Get, Query, Res } from "@nestjs/common";
import { DashboardService } from "../services/dashboard.service";
import { Response } from "express";
import { OkRes } from "src/common/utils";
import { ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { GetPromedioAntiguedadDto } from "../dto/api-response/get-promedio-antiguedad.dto";
import { GetEmpresasAnio } from "../dto/api-response/get-empresas-anio.dto";
import { GetEmpresasAnioParamsDto } from "../dto/api-input/get-empresas-anio-params.dto";
import { GetEmpresasTamaniosParamsDto } from "../dto/api-input/get-empresas-tamanios-params.dto";
import { GetEmpresasTamaniosDto } from "../dto/api-response/get-empresas-tamanios.dto";
import { GetAverageAntiguedadParamsDto } from "../dto/api-input/get-average-antiguedad-params.dto";
import { GetStatisticsParamsDto } from "../dto/get-statistics-params.dto";
import { GetPromedioSedesDto } from "../dto/api-response/get-promedio-sedes.dto";
import { GetPorcentajeRubroParamsDto } from "../dto/api-input/get-porcentajes-rubro-params.dto";
import { GetPorcentajesRubroDto } from "../dto/api-response/get-porcentajes-rubro.dto";
import { GetEmpresasAccionesParamsDto } from "../dto/api-input/get-empresas-acciones-params.dto";
import { GetEmpresasAccionesDto } from "../dto/api-response/get-empresas-acciones.dto";
import { GetEmpresasDepartamentosResponseDto } from "../dto/api-response/get-empresas-departamento.dto";
import { GetTotalHitosAnio } from "../dto/api-response/get-total-hitos-anio.dto";

@ApiTags('Dashboard')
@Controller('api/dashboard')
export class DashboardController {
    constructor(
        private readonly dashboardService: DashboardService
    ){}

    @Get('/promedio-antiguedad')
    @ApiOperation({
        summary: 'Api para obtener el promedio de anios de antiguedad',
        description: 'Este endpoint es para obtener el promedio de anios de antiguedad en base a el anio de fundacion de la empresa'
    })
    @ApiOkResponse({
        description: 'Respuesta en caso de obtener el promedio de antiguedad exitosamente',
        type: GetPromedioAntiguedadDto
    })
    async getPromedioAntiguedad(
        @Query() params: GetAverageAntiguedadParamsDto,
        @Res() res: Response
    ){
        const avg = await this.dashboardService.getAverageAntiguedad(params);
        return OkRes(res,{
            promedio: avg
        })
    }

    @Get('/empresas-anio')
    @ApiOperation({
        summary: 'Api para obtener el el total de empresas registradas por anio de fundacion',
    })
    @ApiOkResponse({
        description: 'Respuesta en caso de obtner las empresa por anio exitosamente',
        type: GetEmpresasAnio
    })
    async getEmpresasPorAnio(
        @Query() params: GetEmpresasAnioParamsDto,
        @Res() res: Response
    ){
        const data = await this.dashboardService.getEmpresasPorAnio(params)
        return OkRes(res,{
            empresasAnio: data
        })
    }

    @Get('/empresas-tamanios-porcentaje')
    @ApiOperation({
        summary: 'API para obtener los tamanis de empresas con datos estaditsticos'
    })
    @ApiOkResponse({
        description: 'Respuesta en caso de obtener los datos de tamanis de empresas',
        type: GetEmpresasTamaniosDto
    })
    async getTamaniosEmpresas(
        @Query() params: GetEmpresasTamaniosParamsDto,
        @Res() res: Response
    ){
        const data = await this.dashboardService.getEmpresasPorTamanio(params)
        return OkRes(res,{
            tamanios: data
        })
    }

    @Get('/porcentajes-rubros')
    @ApiOperation({
        summary: 'Api para obtener los porcentajes de empresas por rubro',
        description: 'Esto devuelve una lisat de rubros donde cada porcentaje pertenece a las empresas que tiene regustradas este rubro'
    })
    @ApiOkResponse({
        type: GetPorcentajesRubroDto,
        description: 'Respuesta en caso de obtener los porcentajes de cada rubro'
    })
    async getEmpresasPorSectorEconomico(
        @Query() params: GetPorcentajeRubroParamsDto,
        @Res() res: Response
    ){
        const rubros = await this.dashboardService.getPorcentajesRubros(params);
        return OkRes(res,{
            rubros: rubros
        })
    }

    @Get('/promedio-sedes')
    @ApiOperation({
        summary: 'Api para obtener el promedio de sedes'
    })
    @ApiOkResponse({
        type: GetPromedioSedesDto,
        description: 'Respuesta en caso de obtener exitosmaente el promedio de sedes'
    })
    async getPromedioSedes(
        @Query() params: GetStatisticsParamsDto,
        @Res() res: Response
    ){
        const promedio = await this.dashboardService.getPromedioSedes(params);
        return OkRes(res,{
            promedio: promedio
        })
    }

    @Get('porciones-accion')
    @ApiOperation({
        summary: 'Api para obtener le proporcion de empresas con ods y sin ods'
    })
    @ApiOkResponse({
        type: GetEmpresasAccionesDto,
        description: 'Respuesta en caso de obtener exitosamente los porcentajes'
    })
    async getEmpresasAcciones(
        @Query() params: GetEmpresasAccionesParamsDto,
        @Res() res: Response
    ){
        const acciones = await this.dashboardService.getEmpresasAcciones(params);
        return OkRes(res,acciones)
    }

    @Get('empresas-departamento')
    @ApiOperation({
        summary: 'Api para obtener el conteo de de empresas que tiene como central cada departamento'
    })
    @ApiOkResponse({
        description: 'Repuesta en caso de obtener los conteos exitosamente',
        type: GetEmpresasDepartamentosResponseDto
    })
    async getEmpresasDepartamentos(
        @Res() res: Response
    ){
        const conteos = await this.dashboardService.getEmpresasPorDepartamentos();
        return OkRes(res,{
            departamentos: conteos
        })
    }

    @Get('total-hitos-anio')
    @ApiOperation({
        summary: 'Api para obtener total de hitos por anio',
    })
    @ApiOkResponse({
        description: 'Respuesta en caso de obtenre la lista hitos por anio',
        type: GetTotalHitosAnio
    })
    async getTotalHitosAnio(@Res() res: Response){
        const data = await this.dashboardService.obtenerTotalHitosAnio();
        return OkRes(res,{
            hitos: data
        })
    }
}