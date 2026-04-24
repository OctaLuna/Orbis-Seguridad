import { CreateProyectoDto } from '../dto/create-proyecto.dto';
import { UpdateProyectoDto } from '../dto/update-proyecto.dto';
import { Proyecto } from '../entities/proyecto.entity';
import { EntityManager, Repository } from 'typeorm';
export declare class ProyectosService {
    private readonly proyectosRepository;
    constructor(proyectosRepository: Repository<Proyecto>);
    create(createProyectoDto: CreateProyectoDto): string;
    createTransaction(manager: EntityManager, data: CreateProyectoDto): Promise<({
        idImplementacionAccion: number;
        nombre: string;
    } & Proyecto)[]>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateProyectoDto: UpdateProyectoDto): string;
    remove(id: number): string;
}
