import { CreateFamiliaDto } from '../dto/create-familia.dto';
import { UpdateFamiliaDto } from '../dto/update-familia.dto';
import { Familia } from '../entities/familia.entity';
import { EntityManager, Repository } from 'typeorm';
export declare class FamiliasService {
    private readonly familiaRepository;
    constructor(familiaRepository: Repository<Familia>);
    create(createFamiliaDto: CreateFamiliaDto): string;
    createTransaction(manager: EntityManager, data: CreateFamiliaDto): Promise<Familia>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateFamiliaDto: UpdateFamiliaDto): string;
    remove(id: number): string;
}
