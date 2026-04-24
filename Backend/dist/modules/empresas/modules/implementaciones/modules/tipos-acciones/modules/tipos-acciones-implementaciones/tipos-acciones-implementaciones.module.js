"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TiposAccionesImplementacionesModule = void 0;
const common_1 = require("@nestjs/common");
const tipos_acciones_implementaciones_service_1 = require("./services/tipos-acciones-implementaciones.service");
const tipos_acciones_implementaciones_controller_1 = require("./api/tipos-acciones-implementaciones.controller");
const typeorm_1 = require("@nestjs/typeorm");
const tipo_accion_implementacion_entity_1 = require("./entities/tipo-accion-implementacion.entity");
const tipos_acciones_module_1 = require("../../tipos-acciones.module");
let TiposAccionesImplementacionesModule = class TiposAccionesImplementacionesModule {
};
exports.TiposAccionesImplementacionesModule = TiposAccionesImplementacionesModule;
exports.TiposAccionesImplementacionesModule = TiposAccionesImplementacionesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([tipo_accion_implementacion_entity_1.TipoAccionImplementacion]),
            tipos_acciones_module_1.TiposAccionesModule
        ],
        controllers: [tipos_acciones_implementaciones_controller_1.TiposAccionesImplementacionesController],
        providers: [tipos_acciones_implementaciones_service_1.TiposAccionesImplementacionesService],
        exports: [tipos_acciones_implementaciones_service_1.TiposAccionesImplementacionesService]
    })
], TiposAccionesImplementacionesModule);
//# sourceMappingURL=tipos-acciones-implementaciones.module.js.map