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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../services/auth.service");
const register_dto_1 = require("../dto/register.dto");
const login_dto_1 = require("../dto/login.dto");
const utils_1 = require("../../../../common/utils");
const swagger_1 = require("@nestjs/swagger");
const common_response_dto_1 = require("../../../../shared/dto/common-response.dto");
const login_response_dto_1 = require("../dto/login-response.dto");
const swagger_response_utils_1 = require("../../../../common/utils/swagger/swagger-response.utils");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async register(data, res) {
        const usuario = await this.authService.register(data);
        return (0, utils_1.CreatedRes)(res, {
            message: 'El usuario fue registrado'
        });
    }
    async login(data, res) {
        const response = await this.authService.login(data);
        return (0, utils_1.OkRes)(res, response);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('/register'),
    (0, swagger_1.ApiOperation)({
        summary: 'Api para registrar usuarios como visitantes',
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'Respuesta en caso de crear usuario exitosamente',
        type: common_response_dto_1.CommonResponseDto
    }),
    (0, swagger_1.ApiBadRequestResponse)((0, swagger_response_utils_1.SwaggerBadRequestCommon)()),
    (0, swagger_1.ApiConflictResponse)({
        description: 'Respuesta en caso de nombre de usuario ya usado',
        type: common_response_dto_1.CommonResponseDto
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Post)('/login'),
    (0, swagger_1.ApiOperation)({
        summary: 'Api iniciar sesion en el sistema'
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Respuesta en caso de iniciar sesion exitosamente',
        type: login_response_dto_1.LoginResponseDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: 'Respuesta en caso de ingresar credenciales incorrectas',
        type: common_response_dto_1.CommonResponseDto
    }),
    (0, swagger_1.ApiBadRequestResponse)((0, swagger_response_utils_1.SwaggerBadRequestCommon)()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('api/auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map