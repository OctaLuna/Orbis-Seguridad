import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Rol } from '../modules/roles/entities/rol.entity';

@Entity('usuarios')
export class Usuario {
    @PrimaryGeneratedColumn({ name: 'id_usuario' })
    id: number;

    @Column({ name: 'usuario' })
    usuario: string;

    @Column({name: 'correo'})
    correo: string

    @Column({ name: 'contrasenia' })
    contrasenia: string;

    @Column({ name: 'id_rol' })
    idRol: number;

    @Column({name: 'expiracion', type: 'timestamp without time zone',nullable: true})
    expiracion?: Date

    @ManyToOne(() => Rol,(rol) => rol.usuarios)
    @JoinColumn({name: 'id_rol'})
    rol: Rol
}
