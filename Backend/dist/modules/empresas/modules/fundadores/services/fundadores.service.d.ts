import { CreateFundadoreDto } from '../dto/create-fundadore.dto';
import { UpdateFundadoreDto } from '../dto/update-fundadore.dto';
import { Fundador } from '../entities/fundador.entity';
import { EntityManager, Repository } from 'typeorm';
export declare class FundadoresService {
    private readonly fundadorRepository;
    constructor(fundadorRepository: Repository<Fundador>);
    createTransaction(maneger: EntityManager, data: CreateFundadoreDto): Promise<({
        idEmpresa: number;
        nombre: string;
    } & Fundador)[]>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateFundadoreDto: UpdateFundadoreDto): string;
    remove(id: number): string;
}
