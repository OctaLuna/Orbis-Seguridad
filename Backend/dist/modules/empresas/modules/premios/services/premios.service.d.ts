import { CreatePremioDto } from '../dto/create-premio.dto';
import { UpdatePremioDto } from '../dto/update-premio.dto';
import { Premio } from '../entities/premio.entity';
import { EntityManager, Repository } from 'typeorm';
export declare class PremiosService {
    private readonly premioRepository;
    constructor(premioRepository: Repository<Premio>);
    create(createPremioDto: CreatePremioDto): string;
    createTransaction(manager: EntityManager, data: CreatePremioDto): Promise<({
        idEmpresa: number;
        nombre: string;
        esPremio: boolean;
        esNacional: boolean;
        anio: number;
    } & Premio)[]>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updatePremioDto: UpdatePremioDto): string;
    remove(id: number): string;
}
