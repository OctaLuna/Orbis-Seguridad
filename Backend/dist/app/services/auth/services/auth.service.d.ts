import { UsuariosAuthService } from 'src/modules/usuarios/services/usuarios-auth.service';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { UsuariosService } from 'src/modules/usuarios/services/usuarios.service';
import { MyJwtConfig } from 'src/config/services/jwt.config';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EmailService } from 'src/shared/services/email/email.service';
export declare class AuthService {
    private readonly usuariosAuthService;
    private readonly usuariosService;
    private readonly jwtConfig;
    private readonly jwtService;
    private readonly configService;
    private readonly emailService;
    constructor(usuariosAuthService: UsuariosAuthService, usuariosService: UsuariosService, jwtConfig: MyJwtConfig, jwtService: JwtService, configService: ConfigService, emailService: EmailService);
    register(data: RegisterDto): Promise<import("../../../../modules/usuarios/entities/usuario.entity").Usuario>;
    login(data: LoginDto): Promise<{
        message: string;
        access_token: string;
        idUsuario: number;
        idRol: number;
        must_change_password: boolean;
    }>;
    solicitarResetPassword(correo: string): Promise<void>;
    validarTokenReset(token: string): Promise<{
        valido: boolean;
    }>;
    confirmarResetPassword(token: string, passwordNuevo: string): Promise<void>;
}
