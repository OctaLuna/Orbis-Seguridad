import { CreateTiposAccionesImplementacioneDto } from '../dto/create-tipos-acciones-implementacione.dto';
import { UpdateTiposAccionesImplementacioneDto } from '../dto/update-tipos-acciones-implementacione.dto';
import { TipoAccionImplementacion } from '../entities/tipo-accion-implementacion.entity';
import { EntityManager, Repository } from 'typeorm';
import { TiposAccionesService } from '../../../services/tipos-acciones.service';
export declare class TiposAccionesImplementacionesService {
    private readonly tipoAccionImplementacionRepository;
    private readonly tiposAccionesService;
    constructor(tipoAccionImplementacionRepository: Repository<TipoAccionImplementacion>, tiposAccionesService: TiposAccionesService);
    create(createTiposAccionesImplementacioneDto: CreateTiposAccionesImplementacioneDto): string;
    createTransaction(manager: EntityManager, data: CreateTiposAccionesImplementacioneDto): Promise<({
        idImplementacion: number;
        idTipoAccion: number;
    } & TipoAccionImplementacion)[]>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateTiposAccionesImplementacioneDto: UpdateTiposAccionesImplementacioneDto): string;
    remove(id: number): string;
}
