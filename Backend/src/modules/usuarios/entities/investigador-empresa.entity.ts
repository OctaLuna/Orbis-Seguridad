import {
    Column, CreateDateColumn, Entity,
    JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique,
} from 'typeorm';
import { Usuario } from './usuario.entity';

@Entity('investigador_empresa')
@Unique(['idUsuario', 'idEmpresa'])
export class InvestigadorEmpresa {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'id_usuario' })
    idUsuario: number;

    @Column({ name: 'id_empresa' })
    idEmpresa: number;

    @Column({ name: 'asignado_por', nullable: true })
    asignadoPor: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @ManyToOne(() => Usuario, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_usuario' })
    usuario: Usuario;
}
