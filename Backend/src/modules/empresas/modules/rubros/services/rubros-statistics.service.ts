import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Rubro } from "../entities/rubro.entity";
import { GetPorcentajeRubroParamsDto } from "src/app/services/dashboard/dto/api-input/get-porcentajes-rubro-params.dto";

@Injectable()
export class RubrosStatisticsService {
    constructor(
        @InjectRepository(Rubro)
        private readonly rubroRepository: Repository<Rubro>
    ) { }

    async getPorcentajesRubro(params: GetPorcentajeRubroParamsDto) {
        const query = this.rubroRepository
            .createQueryBuilder('r')
            .select('r.id_rubro', 'idRubro')
            .addSelect('r.nombre_rubro', 'nombreRubro')
            .addSelect('COUNT(DISTINCT re.id_empresa)', 'totalEmpresas')
            .addSelect(
                `(COUNT(DISTINCT re.id_empresa) * 100.0) / NULLIF((
                    SELECT COUNT(DISTINCT e.id_empresa) 
                    FROM empresas e
                    ${params.familiar === true ? 'WHERE EXISTS (SELECT 1 FROM familias f WHERE f.id_empresa = e.id_empresa AND f.es_familiar = true)' : ''}
                ), 0)`,
                'porcentaje'
            )
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

        const result = await query.getRawMany<{
            idRubro: string;
            nombreRubro: string;
            totalEmpresas: string;
            porcentaje: string;
        }>();

        return result.map(r => ({
            idRubro: parseInt(r.idRubro, 10),
            nombreRubro: r.nombreRubro,
            totalEmpresas: parseInt(r.totalEmpresas, 10),
            porcentaje: parseFloat(r.porcentaje),
        }));
    }
}