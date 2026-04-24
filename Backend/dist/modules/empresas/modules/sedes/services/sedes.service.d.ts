import { CreateSedeDto } from '../dto/create-sede.dto';
import { UpdateSedeDto } from '../dto/update-sede.dto';
import { Sede } from '../entities/sede.entity';
import { EntityManager, Repository } from 'typeorm';
import { DepartamentosService } from '../../departamentos/services/departamentos.service';
export declare class SedesService {
    private readonly sedeRepository;
    private readonly departamentosService;
    constructor(sedeRepository: Repository<Sede>, departamentosService: DepartamentosService);
    create(createSedeDto: CreateSedeDto): string;
    createTransaction(manager: EntityManager, data: CreateSedeDto): Promise<({
        idEmpresa: number;
        idDepartamento: number;
        esCentral: boolean;
    } & Sede)[]>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateSedeDto: UpdateSedeDto): string;
    remove(id: number): string;
}
