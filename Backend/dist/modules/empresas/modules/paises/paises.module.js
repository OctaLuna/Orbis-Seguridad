"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaisesModule = void 0;
const common_1 = require("@nestjs/common");
const paises_service_1 = require("./services/paises.service");
const paises_controller_1 = require("./api/paises.controller");
const typeorm_1 = require("@nestjs/typeorm");
const pais_entity_1 = require("./entities/pais.entity");
let PaisesModule = class PaisesModule {
};
exports.PaisesModule = PaisesModule;
exports.PaisesModule = PaisesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([pais_entity_1.Pais])
        ],
        controllers: [paises_controller_1.PaisesController],
        providers: [paises_service_1.PaisesService],
        exports: [paises_service_1.PaisesService]
    })
], PaisesModule);
//# sourceMappingURL=paises.module.js.map