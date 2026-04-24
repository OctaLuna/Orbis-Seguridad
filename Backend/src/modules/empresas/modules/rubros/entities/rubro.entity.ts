import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RubroEmpresa } from "../modules/rubros-empresas/entities/rubro-empresa.entity";

@Entity('rubros')
export class Rubro {
    @PrimaryGeneratedColumn({ name: 'id_rubro' })
    id: number;

    @Column({ type: 'varchar', length: 100, name: 'nombre_rubro' })
    nombre: string;

    @Column({type: 'boolean',name: 'es_propio',default: false})
    esPropio: boolean

    @OneToMany(() => RubroEmpresa,(rubroEmpresa) => rubroEmpresa.rubro)
    rubroEmpresas: RubroEmpresa[]
}
