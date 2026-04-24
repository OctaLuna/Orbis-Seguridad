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
exports.ImagenesController = void 0;
const common_1 = require("@nestjs/common");
const imagenes_service_1 = require("../services/imagenes.service");
const create_imagene_dto_1 = require("../dto/create-imagene.dto");
const update_imagene_dto_1 = require("../dto/update-imagene.dto");
const swagger_1 = require("@nestjs/swagger");
let ImagenesController = class ImagenesController {
    imagenesService;
    constructor(imagenesService) {
        this.imagenesService = imagenesService;
    }
    create(createImageneDto) {
        return this.imagenesService.create(createImageneDto);
    }
    findAll() {
        return this.imagenesService.findAll();
    }
    findOne(id) {
        return this.imagenesService.findOne(+id);
    }
    update(id, updateImageneDto) {
        return this.imagenesService.update(+id, updateImageneDto);
    }
    remove(id) {
        return this.imagenesService.remove(+id);
    }
    getByEmpresa(idEmpresa) {
        return this.imagenesService.getByEmpresaId(+idEmpresa);
    }
};
exports.ImagenesController = ImagenesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_imagene_dto_1.CreateImageneDto]),
    __metadata("design:returntype", void 0)
], ImagenesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ImagenesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ImagenesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_imagene_dto_1.UpdateImageneDto]),
    __metadata("design:returntype", void 0)
], ImagenesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ImagenesController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('empresa/:idEmpresa'),
    __param(0, (0, common_1.Param)('idEmpresa')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ImagenesController.prototype, "getByEmpresa", null);
exports.ImagenesController = ImagenesController = __decorate([
    (0, swagger_1.ApiExcludeController)(true),
    (0, common_1.Controller)('api/imagenes'),
    __metadata("design:paramtypes", [imagenes_service_1.ImagenesService])
], ImagenesController);
//# sourceMappingURL=imagenes.controller.js.map