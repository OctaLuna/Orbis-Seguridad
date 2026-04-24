import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Hito } from "../entities/hito.entity";
import { Repository } from "typeorm";

@Injectable()
export class HitosStatisticService {
    constructor(
        @InjectRepository(Hito)
        private readonly hitoRepository: Repository<Hito>
    ) { }

    async obtenerTotalesPorAnio() {
        const resultados = await this.hitoRepository
            .createQueryBuilder('hito')
            .select("EXTRACT(YEAR FROM hito.fecha)", "anio")
            .addSelect("COUNT(*)", "total")
            .groupBy("anio")
            .orderBy("anio", "ASC")
            .getRawMany();

        return resultados.map(r => ({
            anio: Number(r.anio),
            total: Number(r.total),
        }));
    }
}