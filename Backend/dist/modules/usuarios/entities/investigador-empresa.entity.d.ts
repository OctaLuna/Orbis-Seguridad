import { Usuario } from './usuario.entity';
export declare class InvestigadorEmpresa {
    id: number;
    idUsuario: number;
    idEmpresa: number;
    asignadoPor: number;
    createdAt: Date;
    usuario: Usuario;
}
