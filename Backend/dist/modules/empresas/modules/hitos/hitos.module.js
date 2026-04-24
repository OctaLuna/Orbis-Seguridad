"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HitosModule = void 0;
const common_1 = require("@nestjs/common");
const hitos_service_1 = require("./services/hitos.service");
const hitos_controller_1 = require("./api/hitos.controller");
const typeorm_1 = require("@nestjs/typeorm");
const hito_entity_1 = require("./entities/hito.entity");
const hitos_statistic_service_1 = require("./services/hitos-statistic.service");
let HitosModule = class HitosModule {
};
exports.HitosModule = HitosModule;
exports.HitosModule = HitosModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([hito_entity_1.Hito])
        ],
        controllers: [hitos_controller_1.HitosController],
        providers: [hitos_service_1.HitosService, hitos_statistic_service_1.HitosStatisticService],
        exports: [hitos_service_1.HitosService, hitos_statistic_service_1.HitosStatisticService]
    })
], HitosModule);
//# sourceMappingURL=hitos.module.js.map