import { Empresa } from "src/modules/empresas/entities/empresa.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('tamanios_empresas')
export class TamanioEmpresa {
    @PrimaryGeneratedColumn({ name: 'id_tamanio' })
    id: number;

    @Column({ type: 'varchar', length: 100, name: 'nombre_tamanio' })
    nombre: string;

    @OneToMany(() => Empresa,(empresa) => empresa.tamanioEmpresa)
    empresas: Empresa[]
}
