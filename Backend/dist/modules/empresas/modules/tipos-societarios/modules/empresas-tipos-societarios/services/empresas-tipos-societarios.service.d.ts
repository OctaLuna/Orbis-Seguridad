import { CreateEmpresasTiposSocietarioDto } from '../dto/create-empresas-tipos-societario.dto';
import { UpdateEmpresasTiposSocietarioDto } from '../dto/update-empresas-tipos-societario.dto';
import { EmpresaTipoSocietario } from '../entities/empresa-tipo-societario.entity';
import { EntityManager, Repository } from 'typeorm';
import { TiposSocietariosService } from '../../../services/tipos-societarios.service';
export declare class EmpresasTiposSocietariosService {
    private readonly empresaTipoSocietario;
    private readonly tiposSocietariosService;
    constructor(empresaTipoSocietario: Repository<EmpresaTipoSocietario>, tiposSocietariosService: TiposSocietariosService);
    create(createEmpresasTiposSocietarioDto: CreateEmpresasTiposSocietarioDto): string;
    createTransaction(manager: EntityManager, data: CreateEmpresasTiposSocietarioDto & {
        idEmpresa: number;
    }): Promise<({
        idEmpresa: number;
        idTipsoc: number;
        esActivo: boolean;
        fechaCambio?: string;
    } & EmpresaTipoSocietario)[]>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateEmpresasTiposSocietarioDto: UpdateEmpresasTiposSocietarioDto): string;
    remove(id: number): string;
}
