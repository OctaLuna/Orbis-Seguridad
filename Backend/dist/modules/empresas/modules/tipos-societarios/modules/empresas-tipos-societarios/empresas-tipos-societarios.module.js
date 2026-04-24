"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmpresasTiposSocietariosModule = void 0;
const common_1 = require("@nestjs/common");
const empresas_tipos_societarios_service_1 = require("./services/empresas-tipos-societarios.service");
const empresas_tipos_societarios_controller_1 = require("./api/empresas-tipos-societarios.controller");
const typeorm_1 = require("@nestjs/typeorm");
const empresa_tipo_societario_entity_1 = require("./entities/empresa-tipo-societario.entity");
const tipos_societarios_module_1 = require("../../tipos-societarios.module");
let EmpresasTiposSocietariosModule = class EmpresasTiposSocietariosModule {
};
exports.EmpresasTiposSocietariosModule = EmpresasTiposSocietariosModule;
exports.EmpresasTiposSocietariosModule = EmpresasTiposSocietariosModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([empresa_tipo_societario_entity_1.EmpresaTipoSocietario]),
            tipos_societarios_module_1.TiposSocietariosModule,
        ],
        controllers: [empresas_tipos_societarios_controller_1.EmpresasTiposSocietariosController],
        providers: [empresas_tipos_societarios_service_1.EmpresasTiposSocietariosService],
        exports: [empresas_tipos_societarios_service_1.EmpresasTiposSocietariosService]
    })
], EmpresasTiposSocietariosModule);
//# sourceMappingURL=empresas-tipos-societarios.module.js.map