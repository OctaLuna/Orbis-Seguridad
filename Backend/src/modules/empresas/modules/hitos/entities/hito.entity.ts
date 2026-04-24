import { Empresa } from "src/modules/empresas/entities/empresa.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('hitos')
export class Hito {
    @PrimaryGeneratedColumn({ name: 'id_hito' })
    id: number;

    @Column({ type: 'int', name: 'id_empresa' })
    idEmpresa: number;

    @Column({ type: 'text', name: 'descripcion' })
    descripcion: string;

    @Column({ type: 'date', name: 'fecha_h'})
    fecha: string;

    @Column({ type: 'varchar', length: 300, name: 'nombre' })
    nombre: string;

    @ManyToOne(() => Empresa,(empresa => empresa.hitos))
    @JoinColumn({name: 'id_empresa'})
    empresa: Empresa
}
