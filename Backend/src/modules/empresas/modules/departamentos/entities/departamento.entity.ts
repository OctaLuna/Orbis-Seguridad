import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Sede } from "../../sedes/entities/sede.entity";

@Entity('departamentos')
export class Departamento {
    @PrimaryGeneratedColumn({ name: 'id_departamento' })
    id: number;

    @Column({ type: 'varchar', length: 30, name: 'nombre_depto' })
    nombre: string;

    @OneToMany(() => Sede,(sede) => sede.departamento)
    sedes: Sede[]
}
