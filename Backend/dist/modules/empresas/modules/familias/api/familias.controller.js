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
exports.FamiliasController = void 0;
const common_1 = require("@nestjs/common");
const familias_service_1 = require("../services/familias.service");
const create_familia_dto_1 = require("../dto/create-familia.dto");
const update_familia_dto_1 = require("../dto/update-familia.dto");
const swagger_1 = require("@nestjs/swagger");
let FamiliasController = class FamiliasController {
    familiasService;
    constructor(familiasService) {
        this.familiasService = familiasService;
    }
    create(createFamiliaDto) {
        return this.familiasService.create(createFamiliaDto);
    }
    findAll() {
        return this.familiasService.findAll();
    }
    findOne(id) {
        return this.familiasService.findOne(+id);
    }
    update(id, updateFamiliaDto) {
        return this.familiasService.update(+id, updateFamiliaDto);
    }
    remove(id) {
        return this.familiasService.remove(+id);
    }
};
exports.FamiliasController = FamiliasController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_familia_dto_1.CreateFamiliaDto]),
    __metadata("design:returntype", void 0)
], FamiliasController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FamiliasController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FamiliasController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_familia_dto_1.UpdateFamiliaDto]),
    __metadata("design:returntype", void 0)
], FamiliasController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FamiliasController.prototype, "remove", null);
exports.FamiliasController = FamiliasController = __decorate([
    (0, swagger_1.ApiExcludeController)(true),
    (0, common_1.Controller)('api/familias'),
    __metadata("design:paramtypes", [familias_service_1.FamiliasService])
], FamiliasController);
//# sourceMappingURL=familias.controller.js.map