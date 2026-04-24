import { Usuario } from "src/modules/usuarios/entities/usuario.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('roles')
export class Rol {
    @PrimaryGeneratedColumn({ name: 'id_rol' })
    id: number;

    @Column({ type: 'varchar', length: 50, name: 'nombre_rol' })
    nombre: string;

    @OneToMany(() => Usuario,(usuario) => usuario.rol)
    usuarios: Usuario[]
}
