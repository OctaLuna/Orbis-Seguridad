import { Empresa } from "src/modules/empresas/entities/empresa.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('familias')
export class Familia {
    @PrimaryGeneratedColumn({ name: 'id_familia' })
    id: number;

    @Column({ type: 'int', name: 'id_empresa' })
    idEmpresa: number;

    @Column({ type: 'boolean', name: 'es_familiar' })
    esFamiliar: boolean;

    @Column({ type: 'int', name: 'anio' })
    anio: number;

    @ManyToOne(() => Empresa,(empresa) => empresa.familias)
    @JoinColumn({name: 'id_empresa'})
    empresa: Empresa
}
