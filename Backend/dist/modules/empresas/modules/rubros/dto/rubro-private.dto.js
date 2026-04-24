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
exports.RubroPrivateDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class RubroPrivateDto {
    id;
    nombre;
    esPropio;
}
exports.RubroPrivateDto = RubroPrivateDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Id del rubro',
        type: Number
    }),
    __metadata("design:type", Number)
], RubroPrivateDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Nombre del rubro',
        type: String
    }),
    __metadata("design:type", String)
], RubroPrivateDto.prototype, "nombre", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Define si el rubro es propio',
        type: Boolean
    }),
    __metadata("design:type", Boolean)
], RubroPrivateDto.prototype, "esPropio", void 0);
//# sourceMappingURL=rubro-private.dto.js.map