"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolicitudesTemporalesModule = void 0;
const common_1 = require("@nestjs/common");
const solicitudes_temporales_service_1 = require("./services/solicitudes-temporales.service");
const solicitudes_temporales_controller_1 = require("./api/solicitudes-temporales.controller");
const typeorm_1 = require("@nestjs/typeorm");
const solicitud_temporal_entity_1 = require("./entities/solicitud-temporal.entity");
const email_module_1 = require("../../../shared/services/email/email.module");
const usuarios_module_1 = require("../../../modules/usuarios/usuarios.module");
let SolicitudesTemporalesModule = class SolicitudesTemporalesModule {
};
exports.SolicitudesTemporalesModule = SolicitudesTemporalesModule;
exports.SolicitudesTemporalesModule = SolicitudesTemporalesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([solicitud_temporal_entity_1.SolicitudTemporal]),
            email_module_1.EmailModule,
            usuarios_module_1.UsuariosModule
        ],
        providers: [solicitudes_temporales_service_1.SolicitudesTemporalesService],
        controllers: [solicitudes_temporales_controller_1.SolicitudesTemporalesController],
        exports: [solicitudes_temporales_service_1.SolicitudesTemporalesService]
    })
], SolicitudesTemporalesModule);
//# sourceMappingURL=solicitudes-temporales.module.js.map