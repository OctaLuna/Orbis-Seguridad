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
exports.RegisterRubrosDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const register_rubro_data_dto_1 = require("./register-rubro-data.dto");
const register_rubro_otro_dto_1 = require("./register-rubro-otro.dto");
class RegisterRubrosDto {
    data;
    otros;
}
exports.RegisterRubrosDto = RegisterRubrosDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Rubros de la lista de seleccion, maximo 2',
        type: register_rubro_data_dto_1.RegisterRubroDataDto,
        nullable: true,
        isArray: true
    }),
    __metadata("design:type", Array)
], RegisterRubrosDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Rubros otros personales de empresa, maximo 2',
        type: register_rubro_otro_dto_1.RegisterRubroOtroDto,
        nullable: true,
        isArray: true
    }),
    __metadata("design:type", Array)
], RegisterRubrosDto.prototype, "otros", void 0);
//# sourceMappingURL=register-rubros.dto.js.map