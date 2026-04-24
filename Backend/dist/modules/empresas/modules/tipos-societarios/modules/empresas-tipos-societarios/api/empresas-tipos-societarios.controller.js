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
exports.EmpresasTiposSocietariosController = void 0;
const common_1 = require("@nestjs/common");
const empresas_tipos_societarios_service_1 = require("../services/empresas-tipos-societarios.service");
const create_empresas_tipos_societario_dto_1 = require("../dto/create-empresas-tipos-societario.dto");
const update_empresas_tipos_societario_dto_1 = require("../dto/update-empresas-tipos-societario.dto");
const swagger_1 = require("@nestjs/swagger");
let EmpresasTiposSocietariosController = class EmpresasTiposSocietariosController {
    empresasTiposSocietariosService;
    constructor(empresasTiposSocietariosService) {
        this.empresasTiposSocietariosService = empresasTiposSocietariosService;
    }
    create(createEmpresasTiposSocietarioDto) {
        return this.empresasTiposSocietariosService.create(createEmpresasTiposSocietarioDto);
    }
    findAll() {
        return this.empresasTiposSocietariosService.findAll();
    }
    findOne(id) {
        return this.empresasTiposSocietariosService.findOne(+id);
    }
    update(id, updateEmpresasTiposSocietarioDto) {
        return this.empresasTiposSocietariosService.update(+id, updateEmpresasTiposSocietarioDto);
    }
    remove(id) {
        return this.empresasTiposSocietariosService.remove(+id);
    }
};
exports.EmpresasTiposSocietariosController = EmpresasTiposSocietariosController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_empresas_tipos_societario_dto_1.CreateEmpresasTiposSocietarioDto]),
    __metadata("design:returntype", void 0)
], EmpresasTiposSocietariosController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EmpresasTiposSocietariosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EmpresasTiposSocietariosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_empresas_tipos_societario_dto_1.UpdateEmpresasTiposSocietarioDto]),
    __metadata("design:returntype", void 0)
], EmpresasTiposSocietariosController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], EmpresasTiposSocietariosController.prototype, "remove", null);
exports.EmpresasTiposSocietariosController = EmpresasTiposSocietariosController = __decorate([
    (0, swagger_1.ApiExcludeController)(true),
    (0, common_1.Controller)('api/empresas-tipos-societarios'),
    __metadata("design:paramtypes", [empresas_tipos_societarios_service_1.EmpresasTiposSocietariosService])
], EmpresasTiposSocietariosController);
//# sourceMappingURL=empresas-tipos-societarios.controller.js.map