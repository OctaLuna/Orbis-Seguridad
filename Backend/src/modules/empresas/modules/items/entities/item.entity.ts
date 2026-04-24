import { Empresa } from "src/modules/empresas/entities/empresa.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('items')
export class Item {
    @PrimaryGeneratedColumn({ name: 'id_item' })
    id: number;

    @Column({ type: 'text', name: 'nombre_item' })
    nombre: string;

    @Column({ name: 'id_empresa', type: 'int'})
    idEmpresa: number

    @ManyToOne(() => Empresa,(empresa) => empresa.items)
    @JoinColumn({name: 'id_empresa'})
    empresa: Empresa
}
