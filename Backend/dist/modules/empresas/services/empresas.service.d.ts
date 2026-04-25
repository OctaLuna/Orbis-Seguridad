import { CreateEmpresaDto } from '../dto/inputs/create-empresa.dto';
import { Empresa } from '../entities/empresa.entity';
import { EntityManager, FindOptionsRelations, FindOptionsSelect, Repository } from 'typeorm';
import { FindAllEmpresasCardsParamsDto } from '../dto/inputs/find-all-empresas-cards-params.dto';
import { FindAllEmpresasCardsPaginationResponseDto } from '../dto/outputs/find-all-empresas-cards-pagination-response.dto';
import { FindAllEmpresasCardsPublicParamsDto } from '../dto/inputs/find-all-empresas-cards-public-params.dto';
import { InvestigadorEmpresa } from 'src/modules/usuarios/entities/investigador-empresa.entity';
export declare class EmpresasService {
    private readonly empresaRepository;
    private readonly investigadorEmpresaRepository;
    constructor(empresaRepository: Repository<Empresa>, investigadorEmpresaRepository: Repository<InvestigadorEmpresa>);
    create(createEmpresaDto: CreateEmpresaDto): string;
    createTransaction(manager: EntityManager, data: CreateEmpresaDto): Promise<Empresa>;
    findAll(): Promise<Empresa[]>;
    findAllCardsPrivate(params: FindAllEmpresasCardsParamsDto, idUsuario?: number): Promise<FindAllEmpresasCardsPaginationResponseDto>;
    findAllCardsPublic(params: FindAllEmpresasCardsPublicParamsDto): Promise<FindAllEmpresasCardsPaginationResponseDto>;
    findOne(idEmpresa: number, selectOptions?: FindOptionsSelect<Empresa>, relationsOptions?: FindOptionsRelations<Empresa>): Promise<Empresa>;
    findOnePublic(idEmpresa: number): Promise<{
        id: number;
        nombreComercial: string;
        mensaje: string;
        rubrosEmpresa: {
            rubro: import("../modules/rubros/entities/rubro.entity").Rubro;
            esActivo: boolean;
        }[];
        departamento: import("../modules/departamentos/entities/departamento.entity").Departamento | undefined;
        imagenes: string[];
        hitos: import("../modules/hitos/entities/hito.entity").Hito[];
    }>;
    findOnePrivate(idEmpresa: number, idUsuario?: number): Promise<Empresa>;
}
