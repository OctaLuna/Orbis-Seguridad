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
exports.EmpresasController = void 0;
const common_1 = require("@nestjs/common");
const empresas_service_1 = require("../services/empresas.service");
const swagger_1 = require("@nestjs/swagger");
const utils_1 = require("../../../common/utils");
const find_all_empresas_cards_params_dto_1 = require("../dto/inputs/find-all-empresas-cards-params.dto");
const find_all_empresas_cards_pagination_response_dto_1 = require("../dto/outputs/find-all-empresas-cards-pagination-response.dto");
const find_one_empresa_public_dto_1 = require("../dto/outputs/find-one-empresa-public.dto");
const find_one_empresa_private_dto_1 = require("../dto/outputs/find-one-empresa-private.dto");
const find_all_empresas_cards_public_params_dto_1 = require("../dto/inputs/find-all-empresas-cards-public-params.dto");
const auth_roles_guard_1 = require("../../../app/services/auth/guards/auth-roles.guard");
const roles_const_1 = require("../../../shared/constants/roles.const");
let EmpresasController = class EmpresasController {
    empresasService;
    constructor(empresasService) {
        this.empresasService = empresasService;
    }
    async findAll(res) {
        const empresas = await this.empresasService.findAll();
        return (0, utils_1.OkRes)(res, { empresas });
    }
    async findAllCardsPublic(params, res) {
        const empresas = await this.empresasService.findAllCardsPublic(params);
        return (0, utils_1.OkRes)(res, { empresas });
    }
    async findAllCardsPrivate(params, req, res) {
        const isInvestigador = roles_const_1.ROLES_INVESTIGADORES.includes(req.user.rol);
        const idUsuario = isInvestigador ? req.user.sub : undefined;
        const empresas = await this.empresasService.findAllCardsPrivate(params, idUsuario);
        return (0, utils_1.OkRes)(res, { empresas });
    }
    async findOnePublic(idEmpresa, res) {
        const empresa = await this.empresasService.findOnePublic(idEmpresa);
        return (0, utils_1.OkRes)(res, { empresa });
    }
    async findOnePrivate(idEmpresa, req, res) {
        const isInvestigador = roles_const_1.ROLES_INVESTIGADORES.includes(req.user.rol);
        const idUsuario = isInvestigador ? req.user.sub : undefined;
        const empresa = await this.empresasService.findOnePrivate(idEmpresa, idUsuario);
        return (0, utils_1.OkRes)(res, { empresa });
    }
};
exports.EmpresasController = EmpresasController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)((0, auth_roles_guard_1.AuthRolesGuard)([roles_const_1.Rol.ADMIN_EMPRESAS])),
    (0, swagger_1.ApiOperation)({ summary: 'Api para obtener todas las empresas con detalle completo (solo admins)' }),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmpresasController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('cards/public'),
    (0, swagger_1.ApiOperation)({
        summary: 'Api para obtener las empresas para las cards de la pagina web, para usuario sin sesion'
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Respuesta en caso de obtener las cads de las empresas',
        type: find_all_empresas_cards_pagination_response_dto_1.FindAllEmpresasCardsPaginationResponseDto
    }),
    (0, swagger_1.ApiBadRequestResponse)((0, utils_1.SwaggerBadRequestCommon)()),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_all_empresas_cards_public_params_dto_1.FindAllEmpresasCardsPublicParamsDto, Object]),
    __metadata("design:returntype", Promise)
], EmpresasController.prototype, "findAllCardsPublic", null);
__decorate([
    (0, common_1.Get)('cards/private'),
    (0, common_1.UseGuards)((0, auth_roles_guard_1.AuthRolesGuard)([roles_const_1.Rol.INVESTIGADOR_JUNIOR])),
    (0, swagger_1.ApiOperation)({
        summary: 'Api para obtener las empresas para las cards de la pagina web, para usuario con sesion'
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Respuesta en caso de obtener las cads de las empresas',
        type: find_all_empresas_cards_pagination_response_dto_1.FindAllEmpresasCardsPaginationResponseDto
    }),
    (0, swagger_1.ApiBadRequestResponse)((0, utils_1.SwaggerBadRequestCommon)()),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_all_empresas_cards_params_dto_1.FindAllEmpresasCardsParamsDto, Object, Object]),
    __metadata("design:returntype", Promise)
], EmpresasController.prototype, "findAllCardsPrivate", null);
__decorate([
    (0, common_1.Get)('public/:idEmpresa'),
    (0, swagger_1.ApiOperation)({
        summary: 'Api paara buscar una empresa. para usuarios sin sesion',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Respuesta en caso de encontrar la empresa',
        type: find_one_empresa_public_dto_1.FindOneEmpresaPublicDto
    }),
    (0, swagger_1.ApiNotFoundResponse)((0, utils_1.SwaggerNotFoundCommon)()),
    __param(0, (0, common_1.Param)('idEmpresa', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], EmpresasController.prototype, "findOnePublic", null);
__decorate([
    (0, common_1.Get)('private/:idEmpresa'),
    (0, common_1.UseGuards)((0, auth_roles_guard_1.AuthRolesGuard)([roles_const_1.Rol.INVESTIGADOR_JUNIOR])),
    (0, swagger_1.ApiOperation)({
        summary: 'Api paara buscar una empresa. para usuarios con sesion',
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Respuesta en caso de encontrar la empresa',
        type: find_one_empresa_private_dto_1.FindOneEmpresaPrivateDto
    }),
    (0, swagger_1.ApiNotFoundResponse)((0, utils_1.SwaggerNotFoundCommon)()),
    __param(0, (0, common_1.Param)('idEmpresa', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, Object]),
    __metadata("design:returntype", Promise)
], EmpresasController.prototype, "findOnePrivate", null);
exports.EmpresasController = EmpresasController = __decorate([
    (0, swagger_1.ApiTags)('Empresas'),
    (0, common_1.Controller)('api/empresas'),
    __metadata("design:paramtypes", [empresas_service_1.EmpresasService])
], EmpresasController);
//# sourceMappingURL=empresas.controller.js.map