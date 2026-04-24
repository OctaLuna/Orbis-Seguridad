import { CreateHitoDto } from '../dto/create-hito.dto';
import { UpdateHitoDto } from '../dto/update-hito.dto';
import { Hito } from '../entities/hito.entity';
import { EntityManager, Repository } from 'typeorm';
export declare class HitosService {
    private readonly hitoRepository;
    constructor(hitoRepository: Repository<Hito>);
    create(createHitoDto: CreateHitoDto): string;
    createTransaction(manager: EntityManager, data: CreateHitoDto): Promise<({
        nombre: string;
        descripcion: string;
        fecha: string;
        idEmpresa: number;
    } & Hito)[]>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateHitoDto: UpdateHitoDto): string;
    remove(id: number): string;
}
