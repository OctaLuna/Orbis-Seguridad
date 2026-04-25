import {
    Column, CreateDateColumn, Entity, JoinColumn,
    ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import { Rol } from '../modules/roles/entities/rol.entity';

@Entity('usuarios')
export class Usuario {
    @PrimaryGeneratedColumn({ name: 'id_usuario' })
    id: number;

    @Column({ name: 'usuario' })
    usuario: string;

    @Column({ name: 'correo' })
    correo: string;

    @Column({ name: 'correo_real', nullable: true })
    correoReal: string;

    @Column({ name: 'contrasenia' })
    contrasenia: string;

    @Column({ name: 'nombre', nullable: true })
    nombre: string;

    @Column({ name: 'apellido', nullable: true })
    apellido: string;

    @Column({ name: 'id_rol' })
    idRol: number;

    // --- Seguridad de contraseña ---

    @Column({ name: 'must_change_password', default: true })
    mustChangePassword: boolean;

    @Column({ name: 'password_changed_at', type: 'timestamp', nullable: true })
    passwordChangedAt: Date;

    @Column({ name: 'password_expires_at', type: 'timestamp', nullable: true })
    passwordExpiresAt: Date;

    // --- Bloqueo de cuenta ---

    @Column({ name: 'is_locked', default: false })
    isLocked: boolean;

    @Column({ name: 'failed_attempts', default: 0 })
    failedAttempts: number;

    @Column({ name: 'locked_at', type: 'timestamp', nullable: true })
    lockedAt: Date;

    // --- Reset de contraseña ---

    @Column({ name: 'reset_token', nullable: true })
    resetToken: string;

    @Column({ name: 'reset_token_expires', type: 'timestamp', nullable: true })
    resetTokenExpires: Date;

    // --- Usuarios temporales ---

    @Column({ name: 'expiracion', type: 'timestamp without time zone', nullable: true })
    expiracion?: Date;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @ManyToOne(() => Rol, (rol) => rol.usuarios)
    @JoinColumn({ name: 'id_rol' })
    rol: Rol;
}
