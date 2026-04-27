import { Usuario } from '../entities/usuario.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { CreateUsuarioNuevoDto } from '../dto/create-usuario-nuevo.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { CreateUsuarioTemporalDto } from '../dto/create-usuario-temporal.dto';
import { UsuariosService } from './usuarios.service';
import { EmailService } from 'src/shared/services/email/email.service';
import { InvestigadorRubro } from '../entities/investigador-rubro.entity';
export declare class UsuariosAuthService {
    private readonly usuarioRepository;
    private readonly investigadorRubroRepository;
    private readonly usuariosService;
    private readonly emailService;
    constructor(usuarioRepository: Repository<Usuario>, investigadorRubroRepository: Repository<InvestigadorRubro>, usuariosService: UsuariosService, emailService: EmailService);
    private sanitize;
    create(data: CreateUsuarioDto): Promise<Usuario>;
    createTemporal(data: CreateUsuarioTemporalDto, manager?: EntityManager): Promise<Usuario>;
    update(id: number, data: UpdateUsuarioDto): Promise<any>;
    remove(id: number): Promise<boolean>;
    crearUsuario(dto: CreateUsuarioNuevoDto, creadorIdRol: number): Promise<Usuario>;
    private calcularRolAdmin;
    private generarAliasUnico;
    private generarPasswordTemporal;
}
