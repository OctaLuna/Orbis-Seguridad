import { Usuario } from './usuario.entity';
export declare class PasswordHistory {
    id: number;
    idUsuario: number;
    passwordHash: string;
    createdAt: Date;
    usuario: Usuario;
}
