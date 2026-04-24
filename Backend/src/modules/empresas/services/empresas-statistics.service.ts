import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Empresa } from "../entities/empresa.entity";
import { Repository } from "typeorm";
import { GetEmpresasAnioParamsDto } from "src/app/services/dashboard/dto/api-input/get-empresas-anio-params.dto";
import { GetEmpresasTamaniosParamsDto } from "src/app/services/dashboard/dto/api-input/get-empresas-tamanios-params.dto";
import { GetAverageAntiguedadParamsDto } from "src/app/services/dashboard/dto/api-input/get-average-antiguedad-params.dto";
import { GetPromedioSedesParamsDto } from "src/app/services/dashboard/dto/api-input/get-promedio-sedes-params.dto";
import { GetEmpresasAccionesParamsDto } from "src/app/services/dashboard/dto/api-input/get-empresas-acciones-params.dto";

@Injectable()
export class EmpresasStatisticsService {
    constructor(
        @InjectRepository(Empresa)
        private readonly empresaRepository: Repository<Empresa>
    ) { }

    async getAverageAntiguedad(params: GetAverageAntiguedadParamsDto): Promise<number> {
        const query = await this.empresaRepository
            .createQueryBuilder('empresa')
            .select('AVG(EXTRACT(YEAR FROM AGE(CURRENT_DATE, empresa.fechaFundacion)))', 'avg')

        if (params.familiar === true) {
            query.andWhere(`EXISTS (SELECT 1 FROM familias f WHERE f.id_empresa = empresa.id AND f.es_familiar = true)`);
        }

        const result = await query.getRawOne<{ avg: string }>();
        return result && result.avg ? parseFloat(result.avg) : 0;
    }

    async getEmpresasPorAnio(params: GetEmpresasAnioParamsDto) {
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

        const result = await query.getRawMany<{ anio: string; total: string }>();

        return result.map(r => ({
            anio: parseInt(r.anio, 10),
            total: parseInt(r.total, 10),
        }));
    }

    async getEmpresasPorTamanio(params: GetEmpresasTamaniosParamsDto) {

        const query = await this.empresaRepository
            .createQueryBuilder('e')
            .innerJoin('e.tamanioEmpresa', 't')
            .select('t.id', 'idTamanio')
            .addSelect('t.nombre', 'nombreTamanio')
            .addSelect('COUNT(*)', 'total')
            .groupBy('t.id')
            .addGroupBy('t.nombre')

        if (params.familiar === true) {
            query.andWhere(`EXISTS (SELECT 1 FROM familias f WHERE f.id_empresa = e.id AND f.es_familiar = true)`);
        }
        const result = await query.getRawMany<{ idTamanio: string; nombreTamanio: string; total: string }>();

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

    async getPromedioSedes(params: GetPromedioSedesParamsDto) {
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
                    .andWhere(
                        params.familiar === true
                            ? `EXISTS (
                                SELECT 1 FROM familias f 
                                WHERE f.id_empresa = e.id 
                                    AND f.es_familiar = true
                                )`
                            : '1=1'
                    );
            }, 'sub');

        const result = await query.getRawOne<{ promedio: string }>();
        return parseFloat(result!.promedio) || 0;
    }

    async getEmpresasAcciones(params: GetEmpresasAccionesParamsDto) {
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
            query.andWhere(
                `EXISTS (
                    SELECT 1 FROM familias f
                    WHERE f.id_empresa = e.id_empresa
                    AND f.es_familiar = true
                )`
            );
        }

        const result = await query.getRawOne<{
            conAcciones: string;
            sinAcciones: string;
        }>();

        return {
            conAcciones: parseFloat(result?.conAcciones || '0'),
            sinAcciones: parseFloat(result?.sinAcciones || '0'),
        };
    }

}