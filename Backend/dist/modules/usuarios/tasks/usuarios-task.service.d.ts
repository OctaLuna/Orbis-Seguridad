import { Usuario } from "../entities/usuario.entity";
import { Repository } from "typeorm";
import { EmailService } from "src/shared/services/email/email.service";
export declare class UsuariosTaskService {
    private readonly usuarioRepository;
    private readonly emailService;
    constructor(usuarioRepository: Repository<Usuario>, emailService: EmailService);
    eliminarUsuarioExpirados(): Promise<void>;
    notificarPasswordsExpiradas(): Promise<void>;
    limpiarTokensResetExpirados(): Promise<void>;
}
