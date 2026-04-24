import { Empresa } from "src/modules/empresas/entities/empresa.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('fundadores')
export class Fundador {
    @PrimaryGeneratedColumn({ name: 'id_fundador' })
    id: number;

    @Column({ type: 'varchar', length: 100, name: 'nombre_completo' })
    nombre: string;

    @Column({ type: 'int', name: 'id_empresa' })
    idEmpresa: number;

    @ManyToOne(() => Empresa,(empresa) => empresa.fundadores)
    @JoinColumn({name: 'id_empresa'})
    empresa: Empresa
}
