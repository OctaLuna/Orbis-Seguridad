import { UsuariosAuthService } from 'src/modules/usuarios/services/usuarios-auth.service';
import { RegisterDto } from '../dto/register.dto';
import { LoginDto } from '../dto/login.dto';
import { UsuariosService } from 'src/modules/usuarios/services/usuarios.service';
import { MyJwtConfig } from 'src/config/services/jwt.config';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly usuariosAuthService;
    private readonly usuariosService;
    private readonly jwtConfig;
    private readonly jwtService;
    constructor(usuariosAuthService: UsuariosAuthService, usuariosService: UsuariosService, jwtConfig: MyJwtConfig, jwtService: JwtService);
    register(data: RegisterDto): Promise<import("../../../../modules/usuarios/entities/usuario.entity").Usuario>;
    login(data: LoginDto): Promise<{
        message: string;
        access_token: string;
        idUsuario: number;
        idRol: number;
    }>;
}
