"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RubrosStatisticsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const rubro_entity_1 = require("../entities/rubro.entity");
let RubrosStatisticsService = class RubrosStatisticsService {
    rubroRepository;
    constructor(rubroRepository) {
        this.rubroRepository = rubroRepository;
    }
    async getPorcentajesRubro(params) {
        const query = this.rubroRepository
            .createQueryBuilder('r')
            .select('r.id_rubro', 'idRubro')
            .addSelect('r.nombre_rubro', 'nombreRubro')
            .addSelect('COUNT(DISTINCT re.id_empresa)', 'totalEmpresas')
            .addSelect(`(COUNT(DISTINCT re.id_empresa) * 100.0) / NULLIF((
                    SELECT COUNT(DISTINCT e.id_empresa) 
                    FROM empresas e
                    ${params.familiar === true ? 'WHERE EXISTS (SELECT 1 FROM familias f WHERE f.id_empresa = e.id_empresa AND f.es_familiar = true)' : ''}
                ), 0)`, 'porcentaje')
            .innerJoin('r.rubroEmpresas', 're')
            .where('r.es_propio = false')
            .andWhere('re.es_activo = true');
        if (params.familiar === true) {
            query.andWhere(`
                EXISTS (
                    SELECT 1 
                    FROM familias f 
                    WHERE f.id_empresa = re.id_empresa
                    AND f.es_familiar = true
                )
            `);
        }
        query.groupBy('r.id_rubro')
            .addGroupBy('r.nombre_rubro')
            .orderBy('COUNT(DISTINCT re.id_empresa)', 'DESC');
        const result = await query.getRawMany();
        return result.map(r => ({
            idRubro: parseInt(r.idRubro, 10),
            nombreRubro: r.nombreRubro,
            totalEmpresas: parseInt(r.totalEmpresas, 10),
            porcentaje: parseFloat(r.porcentaje),
        }));
    }
};
exports.RubrosStatisticsService = RubrosStatisticsService;
exports.RubrosStatisticsService = RubrosStatisticsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(rubro_entity_1.Rubro)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RubrosStatisticsService);
//# sourceMappingURL=rubros-statistics.service.js.map