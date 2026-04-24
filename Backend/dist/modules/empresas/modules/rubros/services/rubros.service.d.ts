import { CreateRubroDto } from '../dto/create-rubro.dto';
import { UpdateRubroDto } from '../dto/update-rubro.dto';
import { Rubro } from '../entities/rubro.entity';
import { EntityManager, Repository } from 'typeorm';
export declare class RubrosService {
    private readonly rubroRepository;
    constructor(rubroRepository: Repository<Rubro>);
    create(createRubroDto: CreateRubroDto): string;
    createTransaccion(manager: EntityManager, data: CreateRubroDto[]): Promise<{
        idRubro: number;
        esActivo: boolean;
    }[]>;
    findManyByIds(ids: number[]): Promise<Rubro[]>;
    findAll(): Promise<Rubro[]>;
    findOne(id: number): string;
    update(id: number, updateRubroDto: UpdateRubroDto): string;
    remove(id: number): string;
}
