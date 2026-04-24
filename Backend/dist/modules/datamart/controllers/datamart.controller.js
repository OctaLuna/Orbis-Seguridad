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
exports.DatamartController = void 0;
const common_1 = require("@nestjs/common");
const datamart_service_1 = require("../services/datamart.service");
const swagger_1 = require("@nestjs/swagger");
const utils_1 = require("../../../common/utils");
const find_all_datamart_response_dto_1 = require("../dto/outputs/find-all-datamart-response.dto");
let DatamartController = class DatamartController {
    datamartService;
    constructor(datamartService) {
        this.datamartService = datamartService;
    }
    async findAll(res) {
        const empresas = await this.datamartService.findAll();
        return (0, utils_1.OkRes)(res, {
            empresas: empresas
        });
    }
};
exports.DatamartController = DatamartController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Api para obtenre todos los datos del datamart'
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Repsuesta en caso de obtener todo el datamart',
        type: find_all_datamart_response_dto_1.FindAllDatamartResponseDto
    }),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DatamartController.prototype, "findAll", null);
exports.DatamartController = DatamartController = __decorate([
    (0, swagger_1.ApiTags)('Datamart'),
    (0, common_1.Controller)('datamart'),
    __metadata("design:paramtypes", [datamart_service_1.DatamartService])
], DatamartController);
//# sourceMappingURL=datamart.controller.js.map