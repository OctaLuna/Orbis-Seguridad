import { Repository } from 'typeorm';
import { PasswordHistory } from '../entities/password-history.entity';
export declare class PasswordHistoryService {
    private readonly repo;
    constructor(repo: Repository<PasswordHistory>);
    verificarReutilizacion(idUsuario: number, passwordPlano: string): Promise<void>;
    guardarEnHistorial(idUsuario: number, hashNuevo: string): Promise<void>;
    obtenerRegistroFechas(idUsuario: number): Promise<{
        fecha: Date;
    }[]>;
}
