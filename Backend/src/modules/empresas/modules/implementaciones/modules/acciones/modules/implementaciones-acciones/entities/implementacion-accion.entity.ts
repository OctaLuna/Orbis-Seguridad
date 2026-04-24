import { Implementacion } from "src/modules/empresas/modules/implementaciones/entities/implementacion.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Accion } from "../../../entities/accion.entity";
import { Proyecto } from "../../proyectos/entities/proyecto.entity";

@Entity('implementaciones_acciones')
export class ImplementacionAccion {
    @PrimaryGeneratedColumn({ name: 'id_implementacion_accion' })
    id: number;

    @Column({ type: 'int', name: 'id_accion' })
    idAccion: number;

    @Column({ type: 'int', name: 'id_implementacion' })
    idImplementacion: number;

    @ManyToOne(() => Implementacion,(imple) => imple.implementacionesAcciones)
    @JoinColumn({name: 'id_implementacion'})
    implementacion: Implementacion

    @ManyToOne(() => Accion,(accion) => accion.implementacionesAcciones)
    @JoinColumn({name: 'id_accion'})
    accion: Accion

    @OneToMany(() => Proyecto,(proy) => proy.implementacionAccion)
    proyectos: Proyecto[]
}
