import { Empresa } from "src/modules/empresas/entities/empresa.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TipoSocietario } from "../../../entities/tipo-societario.entity";

@Entity('empresas_tipos_societarios')
export class EmpresaTipoSocietario {
    @PrimaryGeneratedColumn({ name: 'id_empresas_tipos_societarios' })
    id: number;

    @Column({ type: 'int', name: 'id_empresa' })
    idEmpresa: number;

    @Column({ type: 'int', name: 'id_tipsoc' })
    idTipsoc: number;

    @Column({name: 'es_activo',type: 'boolean',default: true})
    esActivo: boolean

    @Column({name: 'fecha_cambio',type: 'date'})
    fechaCambio: string

    @ManyToOne(() => Empresa,(empresa) => empresa.tiposSocietariosEmpresa)
    @JoinColumn({name: 'id_empresa'})
    empresa: Empresa

    @ManyToOne(() => TipoSocietario,(tipoSocietario) => tipoSocietario.tiposSocietariosEmpresa)
    @JoinColumn({name: 'id_tipsoc'})
    tipoSocietario: TipoSocietario
}
