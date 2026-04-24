"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImplementacionesAccionesModule = void 0;
const common_1 = require("@nestjs/common");
const implementaciones_acciones_service_1 = require("./services/implementaciones-acciones.service");
const implementaciones_acciones_controller_1 = require("./api/implementaciones-acciones.controller");
const typeorm_1 = require("@nestjs/typeorm");
const implementacion_accion_entity_1 = require("./entities/implementacion-accion.entity");
const acciones_module_1 = require("../../acciones.module");
const proyectos_module_1 = require("../proyectos/proyectos.module");
let ImplementacionesAccionesModule = class ImplementacionesAccionesModule {
};
exports.ImplementacionesAccionesModule = ImplementacionesAccionesModule;
exports.ImplementacionesAccionesModule = ImplementacionesAccionesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([implementacion_accion_entity_1.ImplementacionAccion]),
            acciones_module_1.AccionesModule,
            proyectos_module_1.ProyectosModule
        ],
        controllers: [implementaciones_acciones_controller_1.ImplementacionesAccionesController],
        providers: [implementaciones_acciones_service_1.ImplementacionesAccionesService],
        exports: [implementaciones_acciones_service_1.ImplementacionesAccionesService]
    })
], ImplementacionesAccionesModule);
//# sourceMappingURL=implementaciones-acciones.module.js.map