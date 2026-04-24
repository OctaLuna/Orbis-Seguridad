import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EmpresaDt } from "./empresa-dt.entity";
import { ProyectoDt } from "./proyecto-dt.enity";

@Entity('ods_dt')
export class OdsDt {
    @PrimaryGeneratedColumn({ name: 'id_ods' })
    id: number

    @Column({ name: 'nombre_ods', type: 'text' })
    nombre: string

    @Column({ name: 'empresas_dt_id', type: 'int' })
    idEmpresa: number

    @ManyToOne(() => EmpresaDt, (empresaDt) => empresaDt.municipios)
    @JoinColumn({ name: 'empresas_dt_id' })
    empresa: EmpresaDt

    @OneToMany(() => ProyectoDt,(proyectoDt) => proyectoDt.ods)
    proyectos: ProyectoDt[]
}