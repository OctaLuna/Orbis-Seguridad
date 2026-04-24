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
exports.HitosController = void 0;
const common_1 = require("@nestjs/common");
const hitos_service_1 = require("../services/hitos.service");
const create_hito_dto_1 = require("../dto/create-hito.dto");
const update_hito_dto_1 = require("../dto/update-hito.dto");
const swagger_1 = require("@nestjs/swagger");
let HitosController = class HitosController {
    hitosService;
    constructor(hitosService) {
        this.hitosService = hitosService;
    }
    create(createHitoDto) {
        return this.hitosService.create(createHitoDto);
    }
    findAll() {
        return this.hitosService.findAll();
    }
    findOne(id) {
        return this.hitosService.findOne(+id);
    }
    update(id, updateHitoDto) {
        return this.hitosService.update(+id, updateHitoDto);
    }
    remove(id) {
        return this.hitosService.remove(+id);
    }
};
exports.HitosController = HitosController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_hito_dto_1.CreateHitoDto]),
    __metadata("design:returntype", void 0)
], HitosController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HitosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HitosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_hito_dto_1.UpdateHitoDto]),
    __metadata("design:returntype", void 0)
], HitosController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HitosController.prototype, "remove", null);
exports.HitosController = HitosController = __decorate([
    (0, swagger_1.ApiExcludeController)(true),
    (0, common_1.Controller)('api/hitos'),
    __metadata("design:paramtypes", [hitos_service_1.HitosService])
], HitosController);
//# sourceMappingURL=hitos.controller.js.map