import { CreateImplementacioneDto } from '../dto/create-implementacione.dto';
import { UpdateImplementacioneDto } from '../dto/update-implementacione.dto';
import { Implementacion } from '../entities/implementacion.entity';
import { EntityManager, Repository } from 'typeorm';
import { TiposAccionesImplementacionesService } from '../modules/tipos-acciones/modules/tipos-acciones-implementaciones/services/tipos-acciones-implementaciones.service';
import { ImplementacionesAccionesService } from '../modules/acciones/modules/implementaciones-acciones/services/implementaciones-acciones.service';
export declare class ImplementacionesService {
    private readonly implementacionRepository;
    private readonly tiposAccionesImplementacionesService;
    private readonly implementacionesAccionesService;
    constructor(implementacionRepository: Repository<Implementacion>, tiposAccionesImplementacionesService: TiposAccionesImplementacionesService, implementacionesAccionesService: ImplementacionesAccionesService);
    create(data: CreateImplementacioneDto): string;
    createTransaction(manager: EntityManager, data: CreateImplementacioneDto): Promise<Implementacion>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateImplementacioneDto: UpdateImplementacioneDto): string;
    remove(id: number): string;
}
