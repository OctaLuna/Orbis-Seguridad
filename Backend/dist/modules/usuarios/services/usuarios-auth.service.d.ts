import { Usuario } from '../entities/usuario.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { CreateUsuarioTemporalDto } from '../dto/create-usuario-temporal.dto';
import { UsuariosService } from './usuarios.service';
export declare class UsuariosAuthService {
    private readonly usuarioRepository;
    private readonly usuariosService;
    constructor(usuarioRepository: Repository<Usuario>, usuariosService: UsuariosService);
    private sanitize;
    create(data: CreateUsuarioDto): Promise<Usuario>;
    createTemporal(data: CreateUsuarioTemporalDto, manager?: EntityManager): Promise<Usuario>;
    update(id: number, data: UpdateUsuarioDto): Promise<any>;
    remove(id: number): Promise<boolean>;
}
