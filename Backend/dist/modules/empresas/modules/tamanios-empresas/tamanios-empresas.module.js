"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TamaniosEmpresasModule = void 0;
const common_1 = require("@nestjs/common");
const tamanios_empresas_service_1 = require("./services/tamanios-empresas.service");
const tamanios_empresas_controller_1 = require("./api/tamanios-empresas.controller");
const typeorm_1 = require("@nestjs/typeorm");
const tamanio_empresa_entity_1 = require("./entities/tamanio-empresa.entity");
let TamaniosEmpresasModule = class TamaniosEmpresasModule {
};
exports.TamaniosEmpresasModule = TamaniosEmpresasModule;
exports.TamaniosEmpresasModule = TamaniosEmpresasModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([tamanio_empresa_entity_1.TamanioEmpresa])
        ],
        controllers: [tamanios_empresas_controller_1.TamaniosEmpresasController],
        providers: [tamanios_empresas_service_1.TamaniosEmpresasService],
        exports: [tamanios_empresas_service_1.TamaniosEmpresasService]
    })
], TamaniosEmpresasModule);
//# sourceMappingURL=tamanios-empresas.module.js.map