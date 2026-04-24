import { Rol } from '../modules/roles/entities/rol.entity';
export declare class Usuario {
    id: number;
    usuario: string;
    correo: string;
    contrasenia: string;
    idRol: number;
    expiracion?: Date;
    rol: Rol;
}
