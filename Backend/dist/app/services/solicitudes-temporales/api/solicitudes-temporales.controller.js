"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolicitudesTemporalesController = void 0;
const common_1 = require("@nestjs/common");
const solicitudes_temporales_service_1 = require("../services/solicitudes-temporales.service");
const create_solicitud_temporal_dto_1 = require("../dto/create-solicitud-temporal.dto");
const swagger_1 = require("@nestjs/swagger");
const utils_1 = require("../../../../common/utils");
const common_response_dto_1 = require("../../../../shared/dto/common-response.dto");
const swagger_response_utils_1 = require("../../../../common/utils/swagger/swagger-response.utils");
const find_all_solicitudes_params_dto_1 = require("../dto/find-all-solicitudes-params.dto");
const find_all_solicitudes_response_dto_1 = require("../dto/find-all-solicitudes-response.dto");
const rechzar_solicitud_dto_1 = require("../dto/rechzar-solicitud.dto");
let SolicitudesTemporalesController = class SolicitudesTemporalesController {
    service;
    constructor(service) {
        this.service = service;
    }
    async create(dto, res) {
        const created = await this.service.create(dto);
        return (0, utils_1.CreatedRes)(res, {
            message: 'La solicitud temporal fue registrada',
        });
    }
    async findAll(params, res) {
        const solicitudes = await this.service.findAll(params);
        return (0, utils_1.OkRes)(res, {
            solicitudes: solicitudes
        });
    }
    async findOne(id, res) {
        const item = await this.service.findOne(id);
        return (0, utils_1.OkRes)(res, {
            solicitud: item
        });
    }
    async aprobarSolicitud(idSolicitud, res) {
        const response = await this.service.aprobarSolicitud(idSolicitud);
        return (0, utils_1.OkRes)(res, {
            message: 'Solicitud aprobada'
        });
    }
    async rechazarSolicitud(idSolicitud, data, res) {
        const response = await this.service.rechazarSolicitud(idSolicitud, data.motivo);
        return (0, utils_1.OkRes)(res, {
            message: 'La solicitud fue rechazada'
        });
    }
};
exports.SolicitudesTemporalesController = SolicitudesTemporalesController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Crear una solicitud temporal (correo, justificación y fechaUso obligatorios; esAprobado opcional)',
        description: 'Crea un registro en la tabla solicitudes_temporales. El campo fecha (CreateDateColumn) se genera automáticamente.',
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Solicitud creada correctamente',
        type: common_response_dto_1.CommonResponseDto,
    }),
    (0, swagger_1.ApiBadRequestResponse)((0, swagger_response_utils_1.SwaggerBadRequestCommon)()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_solicitud_temporal_dto_1.CreateSolicitudTemporalDto, Object]),
    __metadata("design:returntype", Promise)
], SolicitudesTemporalesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Api para listar todas las solicitudes temporales',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Listado obtenido correctamente',
        type: find_all_solicitudes_response_dto_1.FindAllSolicitudesResponseDto,
    }),
    (0, swagger_1.ApiBadRequestResponse)((0, swagger_response_utils_1.SwaggerBadRequestCommon)()),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_all_solicitudes_params_dto_1.FindAllSolicitudesParamsDto, Object]),
    __metadata("design:returntype", Promise)
], SolicitudesTemporalesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Obtener una solicitud temporal por ID',
    }),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number, description: 'ID de la solicitud temporal' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Solicitud encontrada',
        type: common_response_dto_1.CommonResponseDto,
    }),
    (0, swagger_1.ApiBadRequestResponse)((0, swagger_response_utils_1.SwaggerBadRequestCommon)()),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], SolicitudesTemporalesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)('aprobar/:idSolicitud'),
    (0, swagger_1.ApiOperation)({
        summary: 'Api para aprobar uns solicitud'
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Respuesta en caso de probar exitosamente la solicitud',
        type: common_response_dto_1.CommonResponseDto
    }),
    (0, swagger_1.ApiNotFoundResponse)((0, swagger_response_utils_1.SwaggerNotFoundCommon)()),
    (0, swagger_1.ApiBadRequestResponse)((0, swagger_response_utils_1.SwaggerBadRequestCommon)()),
    __param(0, (0, common_1.Param)('idSolicitud')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], SolicitudesTemporalesController.prototype, "aprobarSolicitud", null);
__decorate([
    (0, common_1.Put)('rechazar/:idSolicitud'),
    (0, swagger_1.ApiOperation)({
        summary: 'Api para rechazar solicitud'
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Respuesta en caso de rechazar exitosamente la solicitud',
        type: common_response_dto_1.CommonResponseDto
    }),
    (0, swagger_1.ApiNotFoundResponse)((0, swagger_response_utils_1.SwaggerNotFoundCommon)()),
    (0, swagger_1.ApiBadRequestResponse)((0, swagger_response_utils_1.SwaggerBadRequestCommon)()),
    __param(0, (0, common_1.Param)('idSolicitud')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, rechzar_solicitud_dto_1.RechazarSolicitudDto, Object]),
    __metadata("design:returntype", Promise)
], SolicitudesTemporalesController.prototype, "rechazarSolicitud", null);
exports.SolicitudesTemporalesController = SolicitudesTemporalesController = __decorate([
    (0, swagger_1.ApiTags)('Solicitudes Temporales'),
    (0, common_1.Controller)('api/solicitudes-temporales'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ whitelist: true, transform: true })),
    __metadata("design:paramtypes", [solicitudes_temporales_service_1.SolicitudesTemporalesService])
], SolicitudesTemporalesController);
//# sourceMappingURL=solicitudes-temporales.controller.js.map