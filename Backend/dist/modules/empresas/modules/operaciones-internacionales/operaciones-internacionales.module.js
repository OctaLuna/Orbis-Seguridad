"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperacionesInternacionalesModule = void 0;
const common_1 = require("@nestjs/common");
const operaciones_internacionales_service_1 = require("./services/operaciones-internacionales.service");
const operaciones_internacionales_controller_1 = require("./api/operaciones-internacionales.controller");
const typeorm_1 = require("@nestjs/typeorm");
const operacion_internacional_entity_1 = require("./entities/operacion-internacional.entity");
const paises_module_1 = require("../paises/paises.module");
let OperacionesInternacionalesModule = class OperacionesInternacionalesModule {
};
exports.OperacionesInternacionalesModule = OperacionesInternacionalesModule;
exports.OperacionesInternacionalesModule = OperacionesInternacionalesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([operacion_internacional_entity_1.OperacionInternacional]),
            paises_module_1.PaisesModule
        ],
        controllers: [operaciones_internacionales_controller_1.OperacionesInternacionalesController],
        providers: [operaciones_internacionales_service_1.OperacionesInternacionalesService],
        exports: [operaciones_internacionales_service_1.OperacionesInternacionalesService]
    })
], OperacionesInternacionalesModule);
//# sourceMappingURL=operaciones-internacionales.module.js.map