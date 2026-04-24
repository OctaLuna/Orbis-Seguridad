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
exports.MunicipiosController = void 0;
const common_1 = require("@nestjs/common");
const municipios_service_1 = require("../services/municipios.service");
const swagger_1 = require("@nestjs/swagger");
const utils_1 = require("../../../../../common/utils");
let MunicipiosController = class MunicipiosController {
    municipiosService;
    constructor(municipiosService) {
        this.municipiosService = municipiosService;
    }
    async findAll(departamentos, res) {
        const municipios = await this.municipiosService.findAll({
            filters: {
                departamentos: departamentos
            }
        });
        return (0, utils_1.OkRes)(res, {
            municipios: municipios
        });
    }
};
exports.MunicipiosController = MunicipiosController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Api para obtener los municipios'
    }),
    (0, swagger_1.ApiQuery)({ description: 'Para fultrar municipios por departamentos seleccionados', name: 'idsDepartamentos', type: [Number], required: false }),
    __param(0, (0, common_1.Query)('idsDepartamentos')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", Promise)
], MunicipiosController.prototype, "findAll", null);
exports.MunicipiosController = MunicipiosController = __decorate([
    (0, swagger_1.ApiTags)('Municipios'),
    (0, common_1.Controller)('api/municipios'),
    __metadata("design:paramtypes", [municipios_service_1.MunicipiosService])
], MunicipiosController);
//# sourceMappingURL=municipios.controller.js.map