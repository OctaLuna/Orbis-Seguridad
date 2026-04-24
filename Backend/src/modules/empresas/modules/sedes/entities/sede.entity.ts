import { Empresa } from "src/modules/empresas/entities/empresa.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Departamento } from "../../departamentos/entities/departamento.entity";

@Entity('sedes')
export class Sede {
    @PrimaryGeneratedColumn({ name: 'id_ubicacion' })
    id: number;

    @Column({ type: 'int', name: 'id_departamento' })
    idDepartamento: number;

    @Column({ type: 'int', name: 'id_empresa' })
    idEmpresa: number;

    @Column({ type: 'boolean', name: 'es_central', default: false })
    esCentral: boolean;

    @ManyToOne(() => Empresa,(empresa) => empresa.sedes)
    @JoinColumn({name: 'id_empresa'})
    empresa: Empresa

    @ManyToOne(() => Departamento,(depa) => depa.sedes)
    @JoinColumn({name: 'id_departamento'})
    departamento: Departamento
}
