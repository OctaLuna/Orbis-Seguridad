import { Rol } from '../modules/roles/entities/rol.entity';
export declare class Usuario {
    id: number;
    usuario: string;
    correo: string;
    correoReal: string;
    contrasenia: string;
    nombre: string;
    apellido: string;
    idRol: number;
    mustChangePassword: boolean;
    passwordChangedAt: Date;
    passwordExpiresAt: Date;
    isLocked: boolean;
    failedAttempts: number;
    lockedAt: Date;
    accesoFormularioExterno: boolean;
    resetToken: string;
    resetTokenExpires: Date;
    expiracion?: Date;
    createdAt: Date;
    updatedAt: Date;
    rol: Rol;
}
