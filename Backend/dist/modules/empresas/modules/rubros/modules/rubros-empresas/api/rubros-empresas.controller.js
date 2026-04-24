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
exports.RubrosEmpresasController = void 0;
const common_1 = require("@nestjs/common");
const rubros_empresas_service_1 = require("../services/rubros-empresas.service");
const create_rubros_empresa_dto_1 = require("../dto/create-rubros-empresa.dto");
const update_rubros_empresa_dto_1 = require("../dto/update-rubros-empresa.dto");
const swagger_1 = require("@nestjs/swagger");
let RubrosEmpresasController = class RubrosEmpresasController {
    rubrosEmpresasService;
    constructor(rubrosEmpresasService) {
        this.rubrosEmpresasService = rubrosEmpresasService;
    }
    create(createRubrosEmpresaDto) {
        return this.rubrosEmpresasService.create(createRubrosEmpresaDto);
    }
    findAll() {
        return this.rubrosEmpresasService.findAll();
    }
    findOne(id) {
        return this.rubrosEmpresasService.findOne(+id);
    }
    update(id, updateRubrosEmpresaDto) {
        return this.rubrosEmpresasService.update(+id, updateRubrosEmpresaDto);
    }
    remove(id) {
        return this.rubrosEmpresasService.remove(+id);
    }
};
exports.RubrosEmpresasController = RubrosEmpresasController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_rubros_empresa_dto_1.CreateRubrosEmpresaDto]),
    __metadata("design:returntype", void 0)
], RubrosEmpresasController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RubrosEmpresasController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RubrosEmpresasController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_rubros_empresa_dto_1.UpdateRubrosEmpresaDto]),
    __metadata("design:returntype", void 0)
], RubrosEmpresasController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RubrosEmpresasController.prototype, "remove", null);
exports.RubrosEmpresasController = RubrosEmpresasController = __decorate([
    (0, swagger_1.ApiExcludeController)(true),
    (0, common_1.Controller)('api/rubros-empresas'),
    __metadata("design:paramtypes", [rubros_empresas_service_1.RubrosEmpresasService])
], RubrosEmpresasController);
//# sourceMappingURL=rubros-empresas.controller.js.map