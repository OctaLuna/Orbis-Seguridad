import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EmpresaDt } from "./empresa-dt.entity";

@Entity('municipios_dt')
export class MunicipioDt {
    @PrimaryGeneratedColumn({ name: 'id_municipios' })
    id: number

    @Column({ name: 'nombre_municipio', type: 'text' })
    nombre: string

    @Column({ name: 'empresas_dt_id', type: 'int' })
    idEmpresa: number

    @ManyToOne(() => EmpresaDt, (empresaDt) => empresaDt.municipios)
    @JoinColumn({ name: 'empresas_dt_id' })
    empresa: EmpresaDt
}