import { RubrosEmpresasService } from '../services/rubros-empresas.service';
import { CreateRubrosEmpresaDto } from '../dto/create-rubros-empresa.dto';
import { UpdateRubrosEmpresaDto } from '../dto/update-rubros-empresa.dto';
export declare class RubrosEmpresasController {
    private readonly rubrosEmpresasService;
    constructor(rubrosEmpresasService: RubrosEmpresasService);
    create(createRubrosEmpresaDto: CreateRubrosEmpresaDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateRubrosEmpresaDto: UpdateRubrosEmpresaDto): string;
    remove(id: string): string;
}
