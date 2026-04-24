"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MunicipiosEmpresaModule = void 0;
const common_1 = require("@nestjs/common");
const municipios_empresa_service_1 = require("./services/municipios-empresa.service");
const municipios_empresa_controller_1 = require("./api/municipios-empresa.controller");
const typeorm_1 = require("@nestjs/typeorm");
const municipio_empresa_entity_1 = require("./entities/municipio-empresa.entity");
const municipios_module_1 = require("../../municipios.module");
let MunicipiosEmpresaModule = class MunicipiosEmpresaModule {
};
exports.MunicipiosEmpresaModule = MunicipiosEmpresaModule;
exports.MunicipiosEmpresaModule = MunicipiosEmpresaModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([municipio_empresa_entity_1.MunicipioEmpresa]),
            municipios_module_1.MunicipiosModule
        ],
        controllers: [municipios_empresa_controller_1.MunicipiosEmpresaController],
        providers: [municipios_empresa_service_1.MunicipiosEmpresaService],
        exports: [municipios_empresa_service_1.MunicipiosEmpresaService]
    })
], MunicipiosEmpresaModule);
//# sourceMappingURL=municipios-empresa.module.js.map