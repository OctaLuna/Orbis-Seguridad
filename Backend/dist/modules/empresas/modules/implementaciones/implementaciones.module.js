"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImplementacionesModule = void 0;
const common_1 = require("@nestjs/common");
const implementaciones_service_1 = require("./services/implementaciones.service");
const implementaciones_controller_1 = require("./api/implementaciones.controller");
const typeorm_1 = require("@nestjs/typeorm");
const implementacion_entity_1 = require("./entities/implementacion.entity");
const tipos_acciones_implementaciones_module_1 = require("./modules/tipos-acciones/modules/tipos-acciones-implementaciones/tipos-acciones-implementaciones.module");
const implementaciones_acciones_module_1 = require("./modules/acciones/modules/implementaciones-acciones/implementaciones-acciones.module");
let ImplementacionesModule = class ImplementacionesModule {
};
exports.ImplementacionesModule = ImplementacionesModule;
exports.ImplementacionesModule = ImplementacionesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([implementacion_entity_1.Implementacion]),
            tipos_acciones_implementaciones_module_1.TiposAccionesImplementacionesModule,
            implementaciones_acciones_module_1.ImplementacionesAccionesModule
        ],
        controllers: [implementaciones_controller_1.ImplementacionesController],
        providers: [implementaciones_service_1.ImplementacionesService],
        exports: [implementaciones_service_1.ImplementacionesService]
    })
], ImplementacionesModule);
//# sourceMappingURL=implementaciones.module.js.map