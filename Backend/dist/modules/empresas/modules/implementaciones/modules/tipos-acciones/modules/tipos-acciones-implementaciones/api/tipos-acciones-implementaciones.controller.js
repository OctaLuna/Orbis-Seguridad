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
exports.TiposAccionesImplementacionesController = void 0;
const common_1 = require("@nestjs/common");
const tipos_acciones_implementaciones_service_1 = require("../services/tipos-acciones-implementaciones.service");
const create_tipos_acciones_implementacione_dto_1 = require("../dto/create-tipos-acciones-implementacione.dto");
const update_tipos_acciones_implementacione_dto_1 = require("../dto/update-tipos-acciones-implementacione.dto");
const swagger_1 = require("@nestjs/swagger");
let TiposAccionesImplementacionesController = class TiposAccionesImplementacionesController {
    tiposAccionesImplementacionesService;
    constructor(tiposAccionesImplementacionesService) {
        this.tiposAccionesImplementacionesService = tiposAccionesImplementacionesService;
    }
    create(createTiposAccionesImplementacioneDto) {
        return this.tiposAccionesImplementacionesService.create(createTiposAccionesImplementacioneDto);
    }
    findAll() {
        return this.tiposAccionesImplementacionesService.findAll();
    }
    findOne(id) {
        return this.tiposAccionesImplementacionesService.findOne(+id);
    }
    update(id, updateTiposAccionesImplementacioneDto) {
        return this.tiposAccionesImplementacionesService.update(+id, updateTiposAccionesImplementacioneDto);
    }
    remove(id) {
        return this.tiposAccionesImplementacionesService.remove(+id);
    }
};
exports.TiposAccionesImplementacionesController = TiposAccionesImplementacionesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_tipos_acciones_implementacione_dto_1.CreateTiposAccionesImplementacioneDto]),
    __metadata("design:returntype", void 0)
], TiposAccionesImplementacionesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TiposAccionesImplementacionesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TiposAccionesImplementacionesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_tipos_acciones_implementacione_dto_1.UpdateTiposAccionesImplementacioneDto]),
    __metadata("design:returntype", void 0)
], TiposAccionesImplementacionesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TiposAccionesImplementacionesController.prototype, "remove", null);
exports.TiposAccionesImplementacionesController = TiposAccionesImplementacionesController = __decorate([
    (0, swagger_1.ApiExcludeController)(true),
    (0, common_1.Controller)('api/tipos-acciones-implementaciones'),
    __metadata("design:paramtypes", [tipos_acciones_implementaciones_service_1.TiposAccionesImplementacionesService])
], TiposAccionesImplementacionesController);
//# sourceMappingURL=tipos-acciones-implementaciones.controller.js.map