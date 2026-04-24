import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'acciones' })
export class Accion {
    @PrimaryGeneratedColumn({ name: 'id_accion' })
    id_accion: number;

    @Column({ type: 'varchar' })
    nombre: string;
}