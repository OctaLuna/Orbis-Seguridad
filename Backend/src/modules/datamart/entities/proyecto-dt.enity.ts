import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { OdsDt } from "./ods-dt.entity";

@Entity('proyectos_dt')
export class ProyectoDt {
    @PrimaryGeneratedColumn({ name: 'id_proyecto' })
    id: number

    @Column({ name: 'nombre_proyecto', type: 'text' })
    nombre: string

    @Column({ name: 'ods_id', type: 'int'})
    idOds: number

    @ManyToOne(() => OdsDt,(odsDt) => odsDt.proyectos)
    @JoinColumn({ name: 'ods_id'})
    ods: OdsDt
}