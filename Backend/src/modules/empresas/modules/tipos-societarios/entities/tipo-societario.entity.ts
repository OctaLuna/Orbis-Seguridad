import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from "typeorm";
import { EmpresaTipoSocietario } from "../modules/empresas-tipos-societarios/entities/empresa-tipo-societario.entity";

@Entity('tipos_societarios')
export class TipoSocietario {
    @PrimaryGeneratedColumn({ name: 'id_tipsoc' })
    id: number;

    @Column({ type: 'varchar', length: 50, name: 'nombre_tipsoc' })
    nombre: string;

    @Column({ type: 'boolean', name: 'es_propio', default: false })
    esPropio: boolean;

    @OneToMany(() => EmpresaTipoSocietario,(empre) => empre.tipoSocietario)
    tiposSocietariosEmpresa: EmpresaTipoSocietario[]
}
