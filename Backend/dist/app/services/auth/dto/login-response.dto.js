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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const common_response_dto_1 = require("../../../../shared/dto/common-response.dto");
class LoginResponseDto extends common_response_dto_1.CommonResponseDto {
    access_token;
    idUsuario;
    idRol;
    must_change_password;
}
exports.LoginResponseDto = LoginResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Token de acceso',
        type: String
    }),
    __metadata("design:type", String)
], LoginResponseDto.prototype, "access_token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Id de usuario',
        type: String
    }),
    __metadata("design:type", String)
], LoginResponseDto.prototype, "idUsuario", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Id del rol del usuario',
        type: Number
    }),
    __metadata("design:type", Number)
], LoginResponseDto.prototype, "idRol", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Indica si el usuario debe cambiar su contraseña antes de operar',
        type: Boolean
    }),
    __metadata("design:type", Boolean)
], LoginResponseDto.prototype, "must_change_password", void 0);
//# sourceMappingURL=login-response.dto.js.map