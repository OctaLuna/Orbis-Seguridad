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
exports.FindAllUsuariosDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const usuario_dto_1 = require("./usuario.dto");
class FindAllUsuariosDto {
    usuarios;
}
exports.FindAllUsuariosDto = FindAllUsuariosDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Lista de usurios',
        type: [usuario_dto_1.UsuarioDto]
    }),
    __metadata("design:type", Array)
], FindAllUsuariosDto.prototype, "usuarios", void 0);
//# sourceMappingURL=find-all-usuarios.dto.js.map