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
exports.FormularioController = void 0;
const common_1 = require("@nestjs/common");
const auth_roles_guard_1 = require("../../auth/guards/auth-roles.guard");
const roles_const_1 = require("../../../../shared/constants/roles.const");
const formulario_service_1 = require("../services/formulario.service");
const swagger_1 = require("@nestjs/swagger");
const utils_1 = require("../../../../common/utils");
const common_response_dto_1 = require("../../../../shared/dto/common-response.dto");
const utils_2 = require("../../../../common/utils");
const register_empresa_dto_1 = require("../dto/register-empresa.dto");
let FormularioController = class FormularioController {
    formularioService;
    constructor(formularioService) {
        this.formularioService = formularioService;
    }
    async registerEmpresa(data, res) {
        const response = await this.formularioService.registerEmpresa(data);
        return (0, utils_1.CreatedRes)(res, {
            message: 'Se registro la empresa exitosamente'
        });
    }
};
exports.FormularioController = FormularioController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, auth_roles_guard_1.AuthRolesGuard)([roles_const_1.Rol.ADMIN_EMPRESAS])),
    (0, swagger_1.ApiOperation)({
        summary: 'Api para registrar la empresa mediante el formulario'
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Respuesta en caso de registrar la empresa exitosamente',
        type: common_response_dto_1.CommonResponseDto
    }),
    (0, swagger_1.ApiNotFoundResponse)((0, utils_2.SwaggerNotFoundCommon)()),
    (0, swagger_1.ApiBadRequestResponse)((0, utils_2.SwaggerBadRequestCommon)()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_empresa_dto_1.RegisterEmpresaDto, Object]),
    __metadata("design:returntype", Promise)
], FormularioController.prototype, "registerEmpresa", null);
exports.FormularioController = FormularioController = __decorate([
    (0, swagger_1.ApiTags)('Formulario'),
    (0, common_1.Controller)('api/formulario'),
    __metadata("design:paramtypes", [formulario_service_1.FormularioService])
], FormularioController);
//# sourceMappingURL=formulario.controller.js.map