import { EmpresasTiposSocietariosService } from '../services/empresas-tipos-societarios.service';
import { CreateEmpresasTiposSocietarioDto } from '../dto/create-empresas-tipos-societario.dto';
import { UpdateEmpresasTiposSocietarioDto } from '../dto/update-empresas-tipos-societario.dto';
export declare class EmpresasTiposSocietariosController {
    private readonly empresasTiposSocietariosService;
    constructor(empresasTiposSocietariosService: EmpresasTiposSocietariosService);
    create(createEmpresasTiposSocietarioDto: CreateEmpresasTiposSocietarioDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateEmpresasTiposSocietarioDto: UpdateEmpresasTiposSocietarioDto): string;
    remove(id: string): string;
}
