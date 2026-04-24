import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EmpresaDt } from "./empresa-dt.entity";

@Entity('sedes_dt')
export class SedeDt {
    @PrimaryGeneratedColumn({ name: 'id_sedes' })
    id: number

    @Column({ name: 'nombre_departamento' })
    nombre: string

    @Column({ name: 'empresas_dt_id', type: 'int' })
    idEmpresa: number

    @ManyToOne(() => EmpresaDt, (empresaDt) => empresaDt.municipios)
    @JoinColumn({ name: 'empresas_dt_id' })
    empresa: EmpresaDt
}