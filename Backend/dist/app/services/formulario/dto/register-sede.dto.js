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
exports.RegisterSedeDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class RegisterSedeDto {
    idDepartamento;
    esCentral;
}
exports.RegisterSedeDto = RegisterSedeDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Id del departamento donde se encuentra la la sede',
        type: Number
    }),
    __metadata("design:type", Number)
], RegisterSedeDto.prototype, "idDepartamento", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Si la sede es la central de la empresa, sol puede haber una sede central por empresa',
        type: Boolean
    }),
    __metadata("design:type", Boolean)
], RegisterSedeDto.prototype, "esCentral", void 0);
//# sourceMappingURL=register-sede.dto.js.map