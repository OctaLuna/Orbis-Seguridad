import { Empresa } from "src/modules/empresas/entities/empresa.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('imagenes')
export class Imagen {
    @PrimaryGeneratedColumn({ name: 'id_imagen' })
    id: number;

    @Column({ type: 'int', name: 'id_empresa' })
    idEmpresa: number;

    @Column({ type: 'varchar', length: 200, name: 'url' })
    url: string;

    @ManyToOne(() => Empresa,(empresa) => empresa.imagenes)
    @JoinColumn({name: 'id_empresa'})
    empresa: Empresa
}
