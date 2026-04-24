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
exports.AccionesController = void 0;
const common_1 = require("@nestjs/common");
const acciones_service_1 = require("../services/acciones.service");
const create_accione_dto_1 = require("../dto/create-accione.dto");
const update_accione_dto_1 = require("../dto/update-accione.dto");
const swagger_1 = require("@nestjs/swagger");
let AccionesController = class AccionesController {
    accionesService;
    constructor(accionesService) {
        this.accionesService = accionesService;
    }
    create(createAccioneDto) {
        return this.accionesService.create(createAccioneDto);
    }
    findAll() {
        return this.accionesService.findAll();
    }
    findOne(id) {
        return this.accionesService.findOne(+id);
    }
    update(id, updateAccioneDto) {
        return this.accionesService.update(+id, updateAccioneDto);
    }
    remove(id) {
        return this.accionesService.remove(+id);
    }
};
exports.AccionesController = AccionesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_accione_dto_1.CreateAccioneDto]),
    __metadata("design:returntype", void 0)
], AccionesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AccionesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AccionesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_accione_dto_1.UpdateAccioneDto]),
    __metadata("design:returntype", void 0)
], AccionesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AccionesController.prototype, "remove", null);
exports.AccionesController = AccionesController = __decorate([
    (0, swagger_1.ApiExcludeController)(true),
    (0, common_1.Controller)('api/acciones'),
    __metadata("design:paramtypes", [acciones_service_1.AccionesService])
], AccionesController);
//# sourceMappingURL=acciones.controller.js.map