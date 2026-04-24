import { CreateImplementacionesAccioneDto } from '../dto/create-implementaciones-accione.dto';
import { UpdateImplementacionesAccioneDto } from '../dto/update-implementaciones-accione.dto';
import { ImplementacionAccion } from '../entities/implementacion-accion.entity';
import { EntityManager, Repository } from 'typeorm';
import { AccionesService } from '../../../services/acciones.service';
import { ProyectosService } from '../../proyectos/services/proyectos.service';
export declare class ImplementacionesAccionesService {
    private readonly implementacionAccionRepository;
    private readonly accionesService;
    private readonly proyectosService;
    constructor(implementacionAccionRepository: Repository<ImplementacionAccion>, accionesService: AccionesService, proyectosService: ProyectosService);
    create(createImplementacionesAccioneDto: CreateImplementacionesAccioneDto): string;
    createTransaction(manager: EntityManager, data: CreateImplementacionesAccioneDto): Promise<ImplementacionAccion[]>;
    private saveImplementacionAccion;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateImplementacionesAccioneDto: UpdateImplementacionesAccioneDto): string;
    remove(id: number): string;
}
