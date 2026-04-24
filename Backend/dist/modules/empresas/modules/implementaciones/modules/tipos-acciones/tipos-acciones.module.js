"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TiposAccionesModule = void 0;
const common_1 = require("@nestjs/common");
const tipos_acciones_service_1 = require("./services/tipos-acciones.service");
const tipos_acciones_controller_1 = require("./api/tipos-acciones.controller");
const typeorm_1 = require("@nestjs/typeorm");
const tipo_accion_entity_1 = require("./entities/tipo-accion.entity");
let TiposAccionesModule = class TiposAccionesModule {
};
exports.TiposAccionesModule = TiposAccionesModule;
exports.TiposAccionesModule = TiposAccionesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([tipo_accion_entity_1.TipoAccion])
        ],
        controllers: [tipos_acciones_controller_1.TiposAccionesController],
        providers: [tipos_acciones_service_1.TiposAccionesService],
        exports: [tipos_acciones_service_1.TiposAccionesService]
    })
], TiposAccionesModule);
//# sourceMappingURL=tipos-acciones.module.js.map