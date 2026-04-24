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
exports.EmpresasStatisticsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const empresa_entity_1 = require("../entities/empresa.entity");
const typeorm_2 = require("typeorm");
let EmpresasStatisticsService = class EmpresasStatisticsService {
    empresaRepository;
    constructor(empresaRepository) {
        this.empresaRepository = empresaRepository;
    }
    async getAverageAntiguedad(params) {
        const query = await this.empresaRepository
            .createQueryBuilder('empresa')
            .select('AVG(EXTRACT(YEAR FROM AGE(CURRENT_DATE, empresa.fechaFundacion)))', 'avg');
        if (params.familiar === true) {
            query.andWhere(`EXISTS (SELECT 1 FROM familias f WHERE f.id_empresa = empresa.id AND f.es_familiar = true)`);
        }
        const result = await query.getRawOne();
        return result && result.avg ? parseFloat(result.avg) : 0;
    }
    async getEmpresasPorAnio(params) {
        const query = this.empresaRepository
            .createQueryBuilder('e')
            .select('EXTRACT(YEAR FROM e.fechaFundacion)', 'anio')
            .addSelect('COUNT(*)', 'total')
            .where('e.id > 0');
        if (!isNaN(params.inicio)) {
            query.andWhere('EXTRACT(YEAR FROM e.fechaFundacion) >= :inicio', { inicio: params.inicio });
        }
        if (!isNaN(params.fin)) {
            query.andWhere('EXTRACT(YEAR FROM e.fechaFundacion) <= :fin', { fin: params.fin });
        }
        if (params.familiar === true) {
            query.andWhere(`EXISTS (SELECT 1 FROM familias f WHERE f.id_empresa = e.id AND f.es_familiar = true)`);
        }
        query.groupBy('anio').orderBy('anio', 'ASC');
        const result = await query.getRawMany();
        return result.map(r => ({
            anio: parseInt(r.anio, 10),
            total: parseInt(r.total, 10),
        }));
    }
    async getEmpresasPorTamanio(params) {
        const query = await this.empresaRepository
            .createQueryBuilder('e')
            .innerJoin('e.tamanioEmpresa', 't')
            .select('t.id', 'idTamanio')
            .addSelect('t.nombre', 'nombreTamanio')
            .addSelect('COUNT(*)', 'total')
            .groupBy('t.id')
            .addGroupBy('t.nombre');
        if (params.familiar === true) {
            query.andWhere(`EXISTS (SELECT 1 FROM familias f WHERE f.id_empresa = e.id AND f.es_familiar = true)`);
        }
        const result = await query.getRawMany();
        const totalEmpresas = result.reduce((acc, r) => acc + parseInt(r.total, 10), 0);
        return result.map(r => ({
            idTamanio: parseInt(r.idTamanio, 10),
            nombreTamanio: r.nombreTamanio,
            total: parseInt(r.total, 10),
            porcentaje: totalEmpresas > 0
                ? parseFloat(((parseInt(r.total, 10) / totalEmpresas) * 100).toFixed(2))
                : 0
        }));
    }
    async getPromedioSedes(params) {
        const query = this.empresaRepository
            .createQueryBuilder('e')
            .select('AVG(sub.total_sedes)', 'promedio')
            .from(subQb => {
            return subQb
                .select('e.id', 'empresa_id')
                .addSelect('COUNT(s.id)', 'total_sedes')
                .from('empresas', 'e')
                .leftJoin('sedes', 's', 's.id_empresa = e.id')
                .groupBy('e.id')
                .where('1=1')
                .andWhere(params.familiar === true
                ? `EXISTS (
                                SELECT 1 FROM familias f 
                                WHERE f.id_empresa = e.id 
                                    AND f.es_familiar = true
                                )`
                : '1=1');
        }, 'sub');
        const result = await query.getRawOne();
        return parseFloat(result.promedio) || 0;
    }
    async getEmpresasAcciones(params) {
        const query = this.empresaRepository
            .createQueryBuilder('e')
            .select([
            `COUNT(DISTINCT e.id_empresa) FILTER (
                WHERE EXISTS (
                    SELECT 1
                    FROM implementaciones i
                    JOIN implementaciones_acciones ia ON ia.id_implementacion = i.id_implementacion
                    WHERE i.id_empresa = e.id_empresa
                )
                )::float * 100 / NULLIF(COUNT(DISTINCT e.id_empresa), 0) AS "conAcciones"`,
            `COUNT(DISTINCT e.id_empresa) FILTER (
                WHERE NOT EXISTS (
                    SELECT 1
                    FROM implementaciones i
                    JOIN implementaciones_acciones ia ON ia.id_implementacion = i.id_implementacion
                    WHERE i.id_empresa = e.id_empresa
                )
                )::float * 100 / NULLIF(COUNT(DISTINCT e.id_empresa), 0) AS "sinAcciones"`
        ]);
        if (params.familiar === true) {
            query.andWhere(`EXISTS (
                    SELECT 1 FROM familias f
                    WHERE f.id_empresa = e.id_empresa
                    AND f.es_familiar = true
                )`);
        }
        const result = await query.getRawOne();
        return {
            conAcciones: parseFloat(result?.conAcciones || '0'),
            sinAcciones: parseFloat(result?.sinAcciones || '0'),
        };
    }
};
exports.EmpresasStatisticsService = EmpresasStatisticsService;
exports.EmpresasStatisticsService = EmpresasStatisticsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(empresa_entity_1.Empresa)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], EmpresasStatisticsService);
//# sourceMappingURL=empresas-statistics.service.js.map