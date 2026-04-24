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
exports.TamaniosEmpresasController = void 0;
const common_1 = require("@nestjs/common");
const tamanios_empresas_service_1 = require("../services/tamanios-empresas.service");
const swagger_1 = require("@nestjs/swagger");
const utils_1 = require("../../../../../common/utils");
let TamaniosEmpresasController = class TamaniosEmpresasController {
    tamaniosEmpresasService;
    constructor(tamaniosEmpresasService) {
        this.tamaniosEmpresasService = tamaniosEmpresasService;
    }
    async findAll(res) {
        const tamaniosEmpresas = await this.tamaniosEmpresasService.findAll();
        return (0, utils_1.OkRes)(res, {
            tamaniosEmpresas: tamaniosEmpresas
        });
    }
};
exports.TamaniosEmpresasController = TamaniosEmpresasController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TamaniosEmpresasController.prototype, "findAll", null);
exports.TamaniosEmpresasController = TamaniosEmpresasController = __decorate([
    (0, swagger_1.ApiTags)('Tamanios de empresas'),
    (0, common_1.Controller)('api/tamanios-empresas'),
    __metadata("design:paramtypes", [tamanios_empresas_service_1.TamaniosEmpresasService])
], TamaniosEmpresasController);
//# sourceMappingURL=tamanios-empresas.controller.js.map