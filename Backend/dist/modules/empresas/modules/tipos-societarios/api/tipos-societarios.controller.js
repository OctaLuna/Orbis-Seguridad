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
exports.TiposSocietariosController = void 0;
const common_1 = require("@nestjs/common");
const tipos_societarios_service_1 = require("../services/tipos-societarios.service");
const swagger_1 = require("@nestjs/swagger");
const utils_1 = require("../../../../../common/utils");
let TiposSocietariosController = class TiposSocietariosController {
    tiposSocietariosService;
    constructor(tiposSocietariosService) {
        this.tiposSocietariosService = tiposSocietariosService;
    }
    async findAll(res) {
        const ts = await this.tiposSocietariosService.findAll();
        return (0, utils_1.OkRes)(res, {
            tiposSocietarios: ts
        });
    }
};
exports.TiposSocietariosController = TiposSocietariosController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Api para obtener los tipos de societarios'
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Respuesta en caso de obtener los tipos de societario exitosamente'
    }),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TiposSocietariosController.prototype, "findAll", null);
exports.TiposSocietariosController = TiposSocietariosController = __decorate([
    (0, swagger_1.ApiTags)('Tipos de societarios'),
    (0, common_1.Controller)('api/tipos-societarios'),
    __metadata("design:paramtypes", [tipos_societarios_service_1.TiposSocietariosService])
], TiposSocietariosController);
//# sourceMappingURL=tipos-societarios.controller.js.map