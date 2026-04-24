import { CreateDepartamentoDto } from '../dto/create-departamento.dto';
import { UpdateDepartamentoDto } from '../dto/update-departamento.dto';
import { Departamento } from '../entities/departamento.entity';
import { Repository } from 'typeorm';
import { OptionsFindOne } from 'src/common/classes';
export declare class DepartamentosService {
    private readonly departamentoRepository;
    constructor(departamentoRepository: Repository<Departamento>);
    create(createDepartamentoDto: CreateDepartamentoDto): string;
    findAll(): Promise<Departamento[]>;
    findManyByIds(ids: number[]): Promise<Departamento[]>;
    findOne(id: number, options?: OptionsFindOne): Promise<Departamento | null>;
    update(id: number, updateDepartamentoDto: UpdateDepartamentoDto): string;
    remove(id: number): string;
}
