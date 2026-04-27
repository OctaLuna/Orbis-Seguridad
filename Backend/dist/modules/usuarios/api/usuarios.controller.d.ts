import { Response } from 'express';
import { UsuariosService, CambiarPasswordDto } from '../services/usuarios.service';
import { UsuariosAuthService } from '../services/usuarios-auth.service';
import { PasswordHistoryService } from '../services/password-history.service';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { CreateUsuarioNuevoDto } from '../dto/create-usuario-nuevo.dto';
export declare class UsuariosController {
    private readonly usuariosService;
    private readonly usuariosAuthService;
    private readonly passwordHistoryService;
    constructor(usuariosService: UsuariosService, usuariosAuthService: UsuariosAuthService, passwordHistoryService: PasswordHistoryService);
    findAll(res: Response): Promise<Response<any, Record<string, any>>>;
    crearUsuario(dto: CreateUsuarioNuevoDto, req: any, res: Response): Promise<Response<any, Record<string, any>>>;
    cambiarPassword(dto: CambiarPasswordDto, req: any, res: Response): Promise<Response<any, Record<string, any>>>;
    updateUsuario(id: number, dto: UpdateUsuarioDto, res: Response): Promise<Response<any, Record<string, any>>>;
    desbloquearCuenta(id: number, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteUsuario(id: number, res: Response): Promise<Response<any, Record<string, any>>>;
    obtenerHistorialPasswords(id: number, res: Response): Promise<Response<any, Record<string, any>>>;
}
