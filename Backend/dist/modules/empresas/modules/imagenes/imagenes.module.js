"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImagenesModule = void 0;
const common_1 = require("@nestjs/common");
const imagenes_service_1 = require("./services/imagenes.service");
const imagenes_controller_1 = require("./api/imagenes.controller");
const typeorm_1 = require("@nestjs/typeorm");
const imagen_entity_1 = require("./entities/imagen.entity");
let ImagenesModule = class ImagenesModule {
};
exports.ImagenesModule = ImagenesModule;
exports.ImagenesModule = ImagenesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([imagen_entity_1.Imagen])
        ],
        controllers: [imagenes_controller_1.ImagenesController],
        providers: [imagenes_service_1.ImagenesService],
        exports: [imagenes_service_1.ImagenesService]
    })
], ImagenesModule);
//# sourceMappingURL=imagenes.module.js.map