import { CreatePaiseDto } from '../dto/create-paise.dto';
import { UpdatePaiseDto } from '../dto/update-paise.dto';
import { Pais } from '../entities/pais.entity';
import { Repository } from 'typeorm';
export declare class PaisesService {
    private readonly paisRepository;
    constructor(paisRepository: Repository<Pais>);
    create(createPaiseDto: CreatePaiseDto): string;
    findManyByIds(ids: number[]): Promise<Pais[]>;
    findAll(): Promise<Pais[]>;
    findOne(id: number): string;
    update(id: number, updatePaiseDto: UpdatePaiseDto): string;
    remove(id: number): string;
}
