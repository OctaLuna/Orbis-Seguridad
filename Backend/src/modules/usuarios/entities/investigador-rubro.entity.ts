import {
    Column, Entity,
    JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique,
} from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity('investigador_rubro')
@Unique(['idUsuario', 'idRubro'])
export class InvestigadorRubro {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'id_usuario' })
    idUsuario: number;

    @Column({ name: 'id_rubro' })
    idRubro: number;

    @ManyToOne(() => Usuario, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_usuario' })
    usuario: Usuario;
}
