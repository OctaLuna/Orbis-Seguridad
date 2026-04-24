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
exports.OperacionesInternacionalesController = void 0;
const common_1 = require("@nestjs/common");
const operaciones_internacionales_service_1 = require("../services/operaciones-internacionales.service");
const create_operaciones_internacionale_dto_1 = require("../dto/create-operaciones-internacionale.dto");
const update_operaciones_internacionale_dto_1 = require("../dto/update-operaciones-internacionale.dto");
const swagger_1 = require("@nestjs/swagger");
let OperacionesInternacionalesController = class OperacionesInternacionalesController {
    operacionesInternacionalesService;
    constructor(operacionesInternacionalesService) {
        this.operacionesInternacionalesService = operacionesInternacionalesService;
    }
    create(createOperacionesInternacionaleDto) {
        return this.operacionesInternacionalesService.create(createOperacionesInternacionaleDto);
    }
    findAll() {
        return this.operacionesInternacionalesService.findAll();
    }
    findOne(id) {
        return this.operacionesInternacionalesService.findOne(+id);
    }
    update(id, updateOperacionesInternacionaleDto) {
        return this.operacionesInternacionalesService.update(+id, updateOperacionesInternacionaleDto);
    }
    remove(id) {
        return this.operacionesInternacionalesService.remove(+id);
    }
};
exports.OperacionesInternacionalesController = OperacionesInternacionalesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_operaciones_internacionale_dto_1.CreateOperacionesInternacionaleDto]),
    __metadata("design:returntype", void 0)
], OperacionesInternacionalesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OperacionesInternacionalesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OperacionesInternacionalesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_operaciones_internacionale_dto_1.UpdateOperacionesInternacionaleDto]),
    __metadata("design:returntype", void 0)
], OperacionesInternacionalesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OperacionesInternacionalesController.prototype, "remove", null);
exports.OperacionesInternacionalesController = OperacionesInternacionalesController = __decorate([
    (0, swagger_1.ApiExcludeController)(true),
    (0, common_1.Controller)('api/operaciones-internacionales'),
    __metadata("design:paramtypes", [operaciones_internacionales_service_1.OperacionesInternacionalesService])
], OperacionesInternacionalesController);
//# sourceMappingURL=operaciones-internacionales.controller.js.map