import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { Usuario } from '../entities/usuario.entity';
import { Repository } from 'typeorm';
import { OptionsFindOne } from 'src/common/classes';
export declare class UsuariosService {
    private readonly usuarioRepository;
    constructor(usuarioRepository: Repository<Usuario>);
    create(createUsuarioDto: CreateUsuarioDto): string;
    findAll(): Promise<Usuario[]>;
    findByUsuario(usuario: string, options?: OptionsFindOne): Promise<Usuario | null>;
    findOne(id: number, options?: OptionsFindOne): Promise<Usuario | null>;
    findOneByCorreo(correo: string, options?: OptionsFindOne): Promise<Usuario | null>;
}
