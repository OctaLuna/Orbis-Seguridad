import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Departamento } from "../entities/departamento.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()

export class DepartamentosStatisticsService {
    constructor(
        @InjectRepository(Departamento)
        private readonly depertamentoRepository: Repository<Departamento>
    ) { }

    async cedePrincipalPorDepatamento() {
        const query = this.depertamentoRepository
            .createQueryBuilder("departamento")
            .leftJoin("departamento.sedes", "sede")
            .leftJoin("sede.empresa", "empresa")
            .select("departamento.id", "idDepartamento")
            .addSelect("departamento.nombre", "nombreDepartamento")
            .addSelect("COUNT(DISTINCT empresa.id)", "cantidadEmpresas")
            .groupBy("departamento.id")
            .addGroupBy("departamento.nombre")
            .orderBy("departamento.nombre", "ASC");

        const resultados = await query.getRawMany();

        return resultados.map((row) => ({
            idDepartamento: Number(row.idDepartamento),
            nombreDepartamento: row.nombreDepartamento,
            cantidadEmpresas: Number(row.cantidadEmpresas),
        }));
    }
}