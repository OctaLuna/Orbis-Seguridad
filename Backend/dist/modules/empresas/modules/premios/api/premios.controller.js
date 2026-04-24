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
exports.PremiosController = void 0;
const common_1 = require("@nestjs/common");
const premios_service_1 = require("../services/premios.service");
const create_premio_dto_1 = require("../dto/create-premio.dto");
const update_premio_dto_1 = require("../dto/update-premio.dto");
const swagger_1 = require("@nestjs/swagger");
let PremiosController = class PremiosController {
    premiosService;
    constructor(premiosService) {
        this.premiosService = premiosService;
    }
    create(createPremioDto) {
        return this.premiosService.create(createPremioDto);
    }
    findAll() {
        return this.premiosService.findAll();
    }
    findOne(id) {
        return this.premiosService.findOne(+id);
    }
    update(id, updatePremioDto) {
        return this.premiosService.update(+id, updatePremioDto);
    }
    remove(id) {
        return this.premiosService.remove(+id);
    }
};
exports.PremiosController = PremiosController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_premio_dto_1.CreatePremioDto]),
    __metadata("design:returntype", void 0)
], PremiosController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PremiosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PremiosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_premio_dto_1.UpdatePremioDto]),
    __metadata("design:returntype", void 0)
], PremiosController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PremiosController.prototype, "remove", null);
exports.PremiosController = PremiosController = __decorate([
    (0, swagger_1.ApiExcludeController)(true),
    (0, common_1.Controller)('api/premios'),
    __metadata("design:paramtypes", [premios_service_1.PremiosService])
], PremiosController);
//# sourceMappingURL=premios.controller.js.map