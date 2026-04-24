import { CreateOperacionesInternacionaleDto } from '../dto/create-operaciones-internacionale.dto';
import { UpdateOperacionesInternacionaleDto } from '../dto/update-operaciones-internacionale.dto';
import { OperacionInternacional } from '../entities/operacion-internacional.entity';
import { EntityManager, Repository } from 'typeorm';
import { PaisesService } from '../../paises/services/paises.service';
export declare class OperacionesInternacionalesService {
    private readonly operacionInternacionalRepository;
    private readonly paisesService;
    constructor(operacionInternacionalRepository: Repository<OperacionInternacional>, paisesService: PaisesService);
    create(createOperacionesInternacionaleDto: CreateOperacionesInternacionaleDto): string;
    createTransaction(manager: EntityManager, data: CreateOperacionesInternacionaleDto): Promise<({
        idEmpresa: number;
        idPais: number;
    } & OperacionInternacional)[]>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateOperacionesInternacionaleDto: UpdateOperacionesInternacionaleDto): string;
    remove(id: number): string;
}
