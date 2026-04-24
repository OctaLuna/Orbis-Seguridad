"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RubrosEmpresasModule = void 0;
const common_1 = require("@nestjs/common");
const rubros_empresas_service_1 = require("./services/rubros-empresas.service");
const rubros_empresas_controller_1 = require("./api/rubros-empresas.controller");
const typeorm_1 = require("@nestjs/typeorm");
const rubro_empresa_entity_1 = require("./entities/rubro-empresa.entity");
const rubros_module_1 = require("../../rubros.module");
let RubrosEmpresasModule = class RubrosEmpresasModule {
};
exports.RubrosEmpresasModule = RubrosEmpresasModule;
exports.RubrosEmpresasModule = RubrosEmpresasModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([rubro_empresa_entity_1.RubroEmpresa]),
            rubros_module_1.RubrosModule
        ],
        controllers: [rubros_empresas_controller_1.RubrosEmpresasController],
        providers: [rubros_empresas_service_1.RubrosEmpresasService],
        exports: [rubros_empresas_service_1.RubrosEmpresasService]
    })
], RubrosEmpresasModule);
//# sourceMappingURL=rubros-empresas.module.js.map