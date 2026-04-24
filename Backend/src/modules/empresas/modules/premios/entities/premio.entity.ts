import { Empresa } from "src/modules/empresas/entities/empresa.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('premios')
export class Premio {
    @PrimaryGeneratedColumn({ name: 'id_premio' })
    id: number;

    @Column({ type: 'text', name: 'nombre' })
    nombre: string;

    @Column({ type: 'boolean', name: 'es_premio' })
    esPremio: boolean;

    @Column({ type: 'boolean', name: 'es_nacional' })
    esNacional: boolean;

    @Column({ type: 'int', name: 'anio' })
    anio: number;

    @Column({ type: 'int', name: 'id_empresa' })
    idEmpresa: number;

    @ManyToOne(() => Empresa,(empresa) => empresa.premios)
    @JoinColumn({name: 'id_empresa'})
    empresa: Empresa
}
