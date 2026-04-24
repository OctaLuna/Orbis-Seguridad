"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccionesModule = void 0;
const common_1 = require("@nestjs/common");
const acciones_service_1 = require("./acciones.service");
const acciones_controller_1 = require("./acciones.controller");
const typeorm_1 = require("@nestjs/typeorm");
const accione_entity_1 = require("./entities/accione.entity");
let AccionesModule = class AccionesModule {
};
exports.AccionesModule = AccionesModule;
exports.AccionesModule = AccionesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([accione_entity_1.Accion])],
        controllers: [acciones_controller_1.AccionesController],
        providers: [acciones_service_1.AccionesService],
    })
], AccionesModule);
//# sourceMappingURL=acciones.module.js.map