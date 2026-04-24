import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TipoAccionImplementacion } from "../modules/tipos-acciones-implementaciones/entities/tipo-accion-implementacion.entity";
import { Implementacion } from "../../../entities/implementacion.entity";

@Entity('tipos_acciones')
export class TipoAccion {
    @PrimaryGeneratedColumn({ name: 'id_tipo_accion' })
    id: number;

    @Column({ type: 'varchar', length: 100, name: 'nombre' })
    nombre: string;

    @OneToMany(() => TipoAccionImplementacion,(tipoAccionImplementacion) => tipoAccionImplementacion.tipoAccion)
    tiposAccionesImplementaciones: TipoAccionImplementacion[]

    @ManyToMany(() => Implementacion,(imple) => imple.tiposAcciones)
    implementaciones: Implementacion[]
}
