import { Empresa } from "src/modules/empresas/entities/empresa.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Rubro } from "../../../entities/rubro.entity";

@Entity('rubros_empresas')
export class RubroEmpresa {
    @PrimaryGeneratedColumn({ name: 'id_rubro_empresa' })
    id: number;

    @Column({ type: 'int', name: 'id_rubro' })
    idRubro: number;

    @Column({ type: 'int', name: 'id_empresa' })
    idEmpresa: number;

    @Column({ type: 'boolean',name: 'es_activo',default: true})
    esActivo: boolean

    @ManyToOne(() => Empresa,(empresa) => empresa.rubrosEmpresa)
    @JoinColumn({name: 'id_empresa'})
    empresa: Empresa

    @ManyToOne(() => Rubro,(rubro) => rubro.rubroEmpresas)
    @JoinColumn({name: 'id_rubro'})
    rubro: Rubro
}
