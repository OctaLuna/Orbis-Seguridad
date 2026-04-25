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
exports.UsuariosController = void 0;
const common_1 = require("@nestjs/common");
const auth_roles_guard_1 = require("../../../app/services/auth/guards/auth-roles.guard");
const roles_const_1 = require("../../../shared/constants/roles.const");
const utils_1 = require("../../../common/utils");
const usuarios_service_1 = require("../services/usuarios.service");
const usuarios_auth_service_1 = require("../services/usuarios-auth.service");
const update_usuario_dto_1 = require("../dto/update-usuario.dto");
const create_usuario_nuevo_dto_1 = require("../dto/create-usuario-nuevo.dto");
const swagger_1 = require("@nestjs/swagger");
const find_all_usuarios_dto_1 = require("../dto/find-all-usuarios.dto");
const common_response_dto_1 = require("../../../shared/dto/common-response.dto");
let UsuariosController = class UsuariosController {
    usuariosService;
    usuariosAuthService;
    constructor(usuariosService, usuariosAuthService) {
        this.usuariosService = usuariosService;
        this.usuariosAuthService = usuariosAuthService;
    }
    async findAll(res) {
        const usuarios = await this.usuariosService.findAll();
        return (0, utils_1.OkRes)(res, { usuarios });
    }
    async crearUsuario(dto, res) {
        const usuario = await this.usuariosAuthService.crearUsuario(dto);
        return (0, utils_1.CreatedRes)(res, { message: 'Usuario creado exitosamente. Las credenciales fueron enviadas por correo.' });
    }
    async cambiarPassword(dto, req, res) {
        await this.usuariosService.cambiarPassword(req.user.sub, dto);
        return (0, utils_1.OkRes)(res, { message: 'Contraseña actualizada exitosamente' });
    }
    async updateUsuario(id, dto, res) {
        await this.usuariosAuthService.update(id, dto);
        return (0, utils_1.OkRes)(res, { message: 'El usuario se actualizó exitosamente' });
    }
    async desbloquearCuenta(id, res) {
        await this.usuariosService.desbloquearCuenta(id);
        return (0, utils_1.OkRes)(res, { message: 'Cuenta desbloqueada exitosamente' });
    }
    async deleteUsuario(id, res) {
        await this.usuariosAuthService.remove(id);
        return (0, utils_1.OkRes)(res, { message: 'Usuario eliminado' });
    }
};
exports.UsuariosController = UsuariosController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)((0, auth_roles_guard_1.AuthRolesGuard)([roles_const_1.Rol.ADMIN_RRHH])),
    (0, swagger_1.ApiOperation)({ summary: 'Api para obtener los usuarios (solo admins)' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Respuesta en caso de obtener usuarios', type: find_all_usuarios_dto_1.FindAllUsuariosDto }),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsuariosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, auth_roles_guard_1.AuthRolesGuard)([roles_const_1.Rol.ADMIN_RRHH])),
    (0, swagger_1.ApiOperation)({ summary: 'Api para crear un usuario con alias @orbis.com (solo admins)' }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Usuario creado y credenciales enviadas por correo', type: common_response_dto_1.CommonResponseDto }),
    (0, swagger_1.ApiBadRequestResponse)((0, utils_1.SwaggerBadRequestCommon)()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_usuario_nuevo_dto_1.CreateUsuarioNuevoDto, Object]),
    __metadata("design:returntype", Promise)
], UsuariosController.prototype, "crearUsuario", null);
__decorate([
    (0, common_1.Patch)('cambiar-password'),
    (0, common_1.UseGuards)((0, auth_roles_guard_1.AuthRolesGuard)([roles_const_1.Rol.VISITANTE])),
    (0, swagger_1.ApiOperation)({ summary: 'Api para que el usuario autenticado cambie su propia contraseña' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Contraseña actualizada exitosamente', type: common_response_dto_1.CommonResponseDto }),
    (0, swagger_1.ApiBadRequestResponse)((0, utils_1.SwaggerBadRequestCommon)()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [usuarios_service_1.CambiarPasswordDto, Object, Object]),
    __metadata("design:returntype", Promise)
], UsuariosController.prototype, "cambiarPassword", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)((0, auth_roles_guard_1.AuthRolesGuard)([roles_const_1.Rol.ADMIN_RRHH])),
    (0, swagger_1.ApiOperation)({ summary: 'Api para actualizar información de un usuario (solo admins)' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Respuesta en caso de actualizar el usuario', type: common_response_dto_1.CommonResponseDto }),
    (0, swagger_1.ApiBadRequestResponse)((0, utils_1.SwaggerBadRequestCommon)()),
    (0, swagger_1.ApiNotFoundResponse)((0, utils_1.SwaggerNotFoundCommon)()),
    (0, swagger_1.ApiConflictResponse)((0, utils_1.SwaggerConflictCommon)()),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Id del usuario' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_usuario_dto_1.UpdateUsuarioDto, Object]),
    __metadata("design:returntype", Promise)
], UsuariosController.prototype, "updateUsuario", null);
__decorate([
    (0, common_1.Patch)(':id/desbloquear'),
    (0, common_1.UseGuards)((0, auth_roles_guard_1.AuthRolesGuard)([roles_const_1.Rol.ADMIN_RRHH])),
    (0, swagger_1.ApiOperation)({ summary: 'Api para desbloquear la cuenta de un usuario (solo admins)' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Cuenta desbloqueada exitosamente', type: common_response_dto_1.CommonResponseDto }),
    (0, swagger_1.ApiNotFoundResponse)((0, utils_1.SwaggerNotFoundCommon)()),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Id del usuario' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UsuariosController.prototype, "desbloquearCuenta", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)((0, auth_roles_guard_1.AuthRolesGuard)([roles_const_1.Rol.ADMIN_RRHH])),
    (0, swagger_1.ApiOperation)({ summary: 'Api para eliminar a un usuario (solo admins)' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Respuesta en caso de eliminar un usuario', type: common_response_dto_1.CommonResponseDto }),
    (0, swagger_1.ApiBadRequestResponse)((0, utils_1.SwaggerBadRequestCommon)()),
    (0, swagger_1.ApiNotFoundResponse)((0, utils_1.SwaggerNotFoundCommon)()),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'Id del usuario' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], UsuariosController.prototype, "deleteUsuario", null);
exports.UsuariosController = UsuariosController = __decorate([
    (0, common_1.Controller)('api/usuarios'),
    __metadata("design:paramtypes", [usuarios_service_1.UsuariosService,
        usuarios_auth_service_1.UsuariosAuthService])
], UsuariosController);
//# sourceMappingURL=usuarios.controller.js.map