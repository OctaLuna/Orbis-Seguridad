import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { Usuario } from '../entities/usuario.entity';
import { Repository } from 'typeorm';
import { OptionsFindOne } from 'src/common/classes';
import { PasswordValidatorService } from 'src/common/services/password-validator.service';
import { PasswordHistoryService } from './password-history.service';
export declare class CambiarPasswordDto {
    passwordActual?: string;
    passwordNuevo: string;
}
export declare class UsuariosService {
    private readonly usuarioRepository;
    private readonly passwordValidator;
    private readonly passwordHistoryService;
    constructor(usuarioRepository: Repository<Usuario>, passwordValidator: PasswordValidatorService, passwordHistoryService: PasswordHistoryService);
    create(createUsuarioDto: CreateUsuarioDto): string;
    findAll(): Promise<Usuario[]>;
    findByUsuario(usuario: string, options?: OptionsFindOne): Promise<Usuario | null>;
    findOne(id: number, options?: OptionsFindOne): Promise<Usuario | null>;
    cambiarPassword(idUsuario: number, dto: CambiarPasswordDto): Promise<void>;
    desbloquearCuenta(id: number): Promise<void>;
    bloquearCuenta(id: number): Promise<void>;
    incrementarIntentos(id: number, count: number): Promise<void>;
    marcarPasswordExpirado(id: number): Promise<void>;
    findOneByCorreo(correo: string, options?: OptionsFindOne): Promise<Usuario | null>;
    findByAnyEmail(email: string): Promise<Usuario | null>;
    guardarResetToken(id: number, tokenHash: string, expires: Date): Promise<void>;
    findByResetToken(tokenHash: string): Promise<Usuario | null>;
    resetearPassword(id: number, passwordNuevo: string): Promise<void>;
}
