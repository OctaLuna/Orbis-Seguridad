import { Usuario } from "src/modules/usuarios/entities/usuario.entity";
export declare class Rol {
    id: number;
    nombre: string;
    usuarios: Usuario[];
}
