"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PremiosModule = void 0;
const common_1 = require("@nestjs/common");
const premios_service_1 = require("./services/premios.service");
const premios_controller_1 = require("./api/premios.controller");
const typeorm_1 = require("@nestjs/typeorm");
const premio_entity_1 = require("./entities/premio.entity");
let PremiosModule = class PremiosModule {
};
exports.PremiosModule = PremiosModule;
exports.PremiosModule = PremiosModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([premio_entity_1.Premio])
        ],
        controllers: [premios_controller_1.PremiosController],
        providers: [premios_service_1.PremiosService],
        exports: [premios_service_1.PremiosService]
    })
], PremiosModule);
//# sourceMappingURL=premios.module.js.map