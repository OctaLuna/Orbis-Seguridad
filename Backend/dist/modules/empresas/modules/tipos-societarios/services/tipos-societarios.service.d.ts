import { CreateTiposSocietarioDto } from '../dto/create-tipos-societario.dto';
import { UpdateTiposSocietarioDto } from '../dto/update-tipos-societario.dto';
import { TipoSocietario } from '../entities/tipo-societario.entity';
import { EntityManager, Repository } from 'typeorm';
export declare class TiposSocietariosService {
    private readonly tipoSocietarioRepository;
    constructor(tipoSocietarioRepository: Repository<TipoSocietario>);
    create(createTiposSocietarioDto: CreateTiposSocietarioDto): string;
    createTransaccion(manager: EntityManager, data: CreateTiposSocietarioDto[]): Promise<{
        idTipsoc: number;
        esActivo: boolean;
        fechaCambio: string;
    }[]>;
    findManyByIds(ids: number[]): Promise<TipoSocietario[]>;
    findAll(): Promise<TipoSocietario[]>;
    findOne(id: number): string;
    update(id: number, updateTiposSocietarioDto: UpdateTiposSocietarioDto): string;
    remove(id: number): string;
}
