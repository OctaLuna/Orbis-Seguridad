import { CreateRubrosEmpresaDto } from '../dto/create-rubros-empresa.dto';
import { UpdateRubrosEmpresaDto } from '../dto/update-rubros-empresa.dto';
import { RubroEmpresa } from '../entities/rubro-empresa.entity';
import { EntityManager, Repository } from 'typeorm';
import { RubrosService } from '../../../services/rubros.service';
export declare class RubrosEmpresasService {
    private readonly rubroEmpresaRepository;
    private readonly rubrosService;
    constructor(rubroEmpresaRepository: Repository<RubroEmpresa>, rubrosService: RubrosService);
    create(createRubrosEmpresaDto: CreateRubrosEmpresaDto): string;
    createTransaction(manager: EntityManager, data: CreateRubrosEmpresaDto & {
        idEmpresa: number;
    }): Promise<({
        idEmpresa: number;
        idRubro: number;
        esActivo: boolean;
    } & RubroEmpresa)[]>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateRubrosEmpresaDto: UpdateRubrosEmpresaDto): string;
    remove(id: number): string;
}
