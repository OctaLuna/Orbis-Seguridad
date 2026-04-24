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
exports.SedesController = void 0;
const common_1 = require("@nestjs/common");
const sedes_service_1 = require("../services/sedes.service");
const create_sede_dto_1 = require("../dto/create-sede.dto");
const update_sede_dto_1 = require("../dto/update-sede.dto");
const swagger_1 = require("@nestjs/swagger");
let SedesController = class SedesController {
    sedesService;
    constructor(sedesService) {
        this.sedesService = sedesService;
    }
    create(createSedeDto) {
        return this.sedesService.create(createSedeDto);
    }
    findAll() {
        return this.sedesService.findAll();
    }
    findOne(id) {
        return this.sedesService.findOne(+id);
    }
    update(id, updateSedeDto) {
        return this.sedesService.update(+id, updateSedeDto);
    }
    remove(id) {
        return this.sedesService.remove(+id);
    }
};
exports.SedesController = SedesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_sede_dto_1.CreateSedeDto]),
    __metadata("design:returntype", void 0)
], SedesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SedesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SedesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_sede_dto_1.UpdateSedeDto]),
    __metadata("design:returntype", void 0)
], SedesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SedesController.prototype, "remove", null);
exports.SedesController = SedesController = __decorate([
    (0, swagger_1.ApiExcludeController)(true),
    (0, common_1.Controller)('api/sedes'),
    __metadata("design:paramtypes", [sedes_service_1.SedesService])
], SedesController);
//# sourceMappingURL=sedes.controller.js.map