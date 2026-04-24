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
exports.ProyectosController = void 0;
const common_1 = require("@nestjs/common");
const proyectos_service_1 = require("../services/proyectos.service");
const create_proyecto_dto_1 = require("../dto/create-proyecto.dto");
const update_proyecto_dto_1 = require("../dto/update-proyecto.dto");
const swagger_1 = require("@nestjs/swagger");
let ProyectosController = class ProyectosController {
    proyectosService;
    constructor(proyectosService) {
        this.proyectosService = proyectosService;
    }
    create(createProyectoDto) {
        return this.proyectosService.create(createProyectoDto);
    }
    findAll() {
        return this.proyectosService.findAll();
    }
    findOne(id) {
        return this.proyectosService.findOne(+id);
    }
    update(id, updateProyectoDto) {
        return this.proyectosService.update(+id, updateProyectoDto);
    }
    remove(id) {
        return this.proyectosService.remove(+id);
    }
};
exports.ProyectosController = ProyectosController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_proyecto_dto_1.CreateProyectoDto]),
    __metadata("design:returntype", void 0)
], ProyectosController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProyectosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProyectosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_proyecto_dto_1.UpdateProyectoDto]),
    __metadata("design:returntype", void 0)
], ProyectosController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProyectosController.prototype, "remove", null);
exports.ProyectosController = ProyectosController = __decorate([
    (0, swagger_1.ApiExcludeController)(true),
    (0, common_1.Controller)('api/proyectos'),
    __metadata("design:paramtypes", [proyectos_service_1.ProyectosService])
], ProyectosController);
//# sourceMappingURL=proyectos.controller.js.map