import { Empresa } from "src/modules/empresas/entities/empresa.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ImplementacionAccion } from "../modules/acciones/modules/implementaciones-acciones/entities/implementacion-accion.entity";
import { TipoAccionImplementacion } from "../modules/tipos-acciones/modules/tipos-acciones-implementaciones/entities/tipo-accion-implementacion.entity";
import { TipoAccion } from "../modules/tipos-acciones/entities/tipo-accion.entity";

@Entity('implementaciones')
export class Implementacion {
    @PrimaryGeneratedColumn({ name: 'id_implementacion' })
    id: number;

    @Column({ type: 'int', name: 'anio' })
    anio: number;

    @Column({ type: 'int', name: 'id_empresa' })
    idEmpresa: number;

    @OneToOne(() => Empresa, (empresa) => empresa.implementacion)
    @JoinColumn({ name: 'id_empresa' })
    empresa: Empresa

    @OneToMany(() => ImplementacionAccion, (impleAcc) => impleAcc.implementacion)
    implementacionesAcciones: ImplementacionAccion[]

    @OneToMany(() => TipoAccionImplementacion, (tiAccImple) => tiAccImple.implementacion)
    tiposAccionesImplementaciones: TipoAccionImplementacion[]

    @ManyToMany(() => TipoAccion, (tipoAccion) => tipoAccion.implementaciones)
    @JoinTable({
        name: 'tipos_acciones_implementaciones',
        joinColumn: { name: 'id_implementacion' },
        inverseJoinColumn: { name: 'id_tipo_accion' }
    })
    tiposAcciones: TipoAccion[]
}
