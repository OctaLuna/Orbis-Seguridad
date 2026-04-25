import { MyJwtConfig } from 'src/config/services/jwt.config';
import { UsuariosService } from 'src/modules/usuarios/services/usuarios.service';
declare const JwtStrategy_base: new (...args: any) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly jwtConfig;
    private readonly usuariosService;
    constructor(jwtConfig: MyJwtConfig, usuariosService: UsuariosService);
    validate(payload: any): Promise<{
        sub: any;
        usuario: any;
        rol: any;
        must_change_password: any;
    }>;
}
export {};
