import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ImplementacionAccion } from "../modules/implementaciones-acciones/entities/implementacion-accion.entity";

@Entity('acciones')
export class Accion {
    @PrimaryGeneratedColumn({ name: 'id_accion' })
    id: number;

    @Column({ type: 'varchar', length: 300, name: 'nombre' })
    nombre: string;

    @OneToMany(() => ImplementacionAccion,(impleAcc) => impleAcc.accion)
    implementacionesAcciones: ImplementacionAccion[]
}
