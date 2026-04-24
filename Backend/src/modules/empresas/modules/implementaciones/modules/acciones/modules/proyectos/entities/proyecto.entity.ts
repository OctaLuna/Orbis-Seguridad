import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ImplementacionAccion } from "../../implementaciones-acciones/entities/implementacion-accion.entity";

@Entity('proyectos')
export class Proyecto {
    @PrimaryGeneratedColumn({ name: 'id_proyecto' })
    id: number;

    @Column({ type: 'varchar', length: 300, name: 'nombre' })
    nombre: string;

    @Column({ type: 'int', name: 'id_implementacion_accion' })
    idImplementacionAccion: number;

    @ManyToOne(() => ImplementacionAccion,(impleAcc) => impleAcc.proyectos)
    @JoinColumn({name: 'id_implementacion_accion'})
    implementacionAccion: ImplementacionAccion
}
