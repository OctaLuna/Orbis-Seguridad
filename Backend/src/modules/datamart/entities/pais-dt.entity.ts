import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EmpresaDt } from "./empresa-dt.entity";

@Entity('paises_dt')
export class PaisDt {
    @PrimaryGeneratedColumn({ name: 'id_paises' })
    id: number;

    @Column({ name: 'nombre_pais', type: 'text' })
    nombre: string;

    @Column({ name: 'empresas_dt_id', type: 'int' })
    idEmpresa: number

    @ManyToOne(() => EmpresaDt, (empresaDt) => empresaDt.municipios)
    @JoinColumn({ name: 'empresas_dt_id' })
    empresa: EmpresaDt
}