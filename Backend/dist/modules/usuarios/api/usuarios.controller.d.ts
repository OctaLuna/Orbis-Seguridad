import { Response } from 'express';
import { UsuariosService, CambiarPasswordDto } from '../services/usuarios.service';
import { UsuariosAuthService } from '../services/usuarios-auth.service';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { CreateUsuarioNuevoDto } from '../dto/create-usuario-nuevo.dto';
export declare class UsuariosController {
    private readonly usuariosService;
    private readonly usuariosAuthService;
    constructor(usuariosService: UsuariosService, usuariosAuthService: UsuariosAuthService);
    findAll(res: Response): Promise<Response<any, Record<string, any>>>;
    crearUsuario(dto: CreateUsuarioNuevoDto, res: Response): Promise<Response<any, Record<string, any>>>;
    cambiarPassword(dto: CambiarPasswordDto, req: any, res: Response): Promise<Response<any, Record<string, any>>>;
    updateUsuario(id: number, dto: UpdateUsuarioDto, res: Response): Promise<Response<any, Record<string, any>>>;
    desbloquearCuenta(id: number, res: Response): Promise<Response<any, Record<string, any>>>;
    deleteUsuario(id: number, res: Response): Promise<Response<any, Record<string, any>>>;
}
