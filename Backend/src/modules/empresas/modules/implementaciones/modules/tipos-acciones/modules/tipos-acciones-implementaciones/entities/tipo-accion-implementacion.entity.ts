import { Implementacion } from "src/modules/empresas/modules/implementaciones/entities/implementacion.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TipoAccion } from "../../../entities/tipo-accion.entity";

@Entity('tipos_acciones_implementaciones')
export class TipoAccionImplementacion {
    @PrimaryGeneratedColumn({ name: 'id_tipo_accion_implementacion' })
    id: number;

    @Column({ type: 'int', name: 'id_tipo_accion' })
    idTipoAccion: number;

    @Column({ type: 'int', name: 'id_implementacion' })
    idImplementacion: number;

    @ManyToOne(() => Implementacion,(imple) => imple.tiposAccionesImplementaciones)
    @JoinColumn({name: 'id_implementacion'})
    implementacion: Implementacion

    @ManyToOne(() => TipoAccion,(tipoAccion) => tipoAccion.tiposAccionesImplementaciones)
    @JoinColumn({name: 'id_tipo_accion'})
    tipoAccion: TipoAccion
}
