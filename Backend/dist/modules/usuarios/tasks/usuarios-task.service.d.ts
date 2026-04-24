import { Usuario } from "../entities/usuario.entity";
import { Repository } from "typeorm";
export declare class UsuariosTaskService {
    private readonly usuarioRepository;
    constructor(usuarioRepository: Repository<Usuario>);
    eliminarUsuarioExpirados(): Promise<void>;
}
