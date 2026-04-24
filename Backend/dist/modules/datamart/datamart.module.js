"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatamartModule = void 0;
const common_1 = require("@nestjs/common");
const datamart_service_1 = require("./services/datamart.service");
const datamart_controller_1 = require("./controllers/datamart.controller");
const typeorm_1 = require("@nestjs/typeorm");
const empresa_dt_entity_1 = require("./entities/empresa-dt.entity");
const municipio_dt_entity_1 = require("./entities/municipio-dt.entity");
const ods_dt_entity_1 = require("./entities/ods-dt.entity");
const pais_dt_entity_1 = require("./entities/pais-dt.entity");
const proyecto_dt_enity_1 = require("./entities/proyecto-dt.enity");
const sede_dt_entity_1 = require("./entities/sede-dt.entity");
let DatamartModule = class DatamartModule {
};
exports.DatamartModule = DatamartModule;
exports.DatamartModule = DatamartModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                empresa_dt_entity_1.EmpresaDt,
                municipio_dt_entity_1.MunicipioDt,
                ods_dt_entity_1.OdsDt,
                pais_dt_entity_1.PaisDt,
                proyecto_dt_enity_1.ProyectoDt,
                sede_dt_entity_1.SedeDt,
            ])
        ],
        controllers: [datamart_controller_1.DatamartController],
        providers: [datamart_service_1.DatamartService],
        exports: [datamart_service_1.DatamartService]
    })
], DatamartModule);
//# sourceMappingURL=datamart.module.js.map