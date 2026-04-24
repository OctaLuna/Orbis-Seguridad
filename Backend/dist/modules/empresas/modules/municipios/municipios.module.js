"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MunicipiosModule = void 0;
const common_1 = require("@nestjs/common");
const municipios_service_1 = require("./services/municipios.service");
const municipios_controller_1 = require("./api/municipios.controller");
const typeorm_1 = require("@nestjs/typeorm");
const municipio_entity_1 = require("./entities/municipio.entity");
let MunicipiosModule = class MunicipiosModule {
};
exports.MunicipiosModule = MunicipiosModule;
exports.MunicipiosModule = MunicipiosModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([municipio_entity_1.Municipio])
        ],
        controllers: [municipios_controller_1.MunicipiosController],
        providers: [municipios_service_1.MunicipiosService],
        exports: [municipios_service_1.MunicipiosService]
    })
], MunicipiosModule);
//# sourceMappingURL=municipios.module.js.map