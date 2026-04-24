"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TiposSocietariosModule = void 0;
const common_1 = require("@nestjs/common");
const tipos_societarios_service_1 = require("./services/tipos-societarios.service");
const tipos_societarios_controller_1 = require("./api/tipos-societarios.controller");
const typeorm_1 = require("@nestjs/typeorm");
const tipo_societario_entity_1 = require("./entities/tipo-societario.entity");
let TiposSocietariosModule = class TiposSocietariosModule {
};
exports.TiposSocietariosModule = TiposSocietariosModule;
exports.TiposSocietariosModule = TiposSocietariosModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([tipo_societario_entity_1.TipoSocietario])
        ],
        controllers: [tipos_societarios_controller_1.TiposSocietariosController],
        providers: [tipos_societarios_service_1.TiposSocietariosService],
        exports: [tipos_societarios_service_1.TiposSocietariosService]
    })
], TiposSocietariosModule);
//# sourceMappingURL=tipos-societarios.module.js.map