import { CreateMunicipiosEmpresaDto } from '../dto/create-municipios-empresa.dto';
import { UpdateMunicipiosEmpresaDto } from '../dto/update-municipios-empresa.dto';
import { MunicipioEmpresa } from '../entities/municipio-empresa.entity';
import { EntityManager, Repository } from 'typeorm';
import { MunicipiosService } from '../../../services/municipios.service';
export declare class MunicipiosEmpresaService {
    private readonly municipioEmpresaRepository;
    private readonly municipiosService;
    constructor(municipioEmpresaRepository: Repository<MunicipioEmpresa>, municipiosService: MunicipiosService);
    create(createMunicipiosEmpresaDto: CreateMunicipiosEmpresaDto): string;
    createTransaction(manager: EntityManager, data: CreateMunicipiosEmpresaDto): Promise<({
        idEmpresa: number;
        idMunicipio: number;
    } & MunicipioEmpresa)[]>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateMunicipiosEmpresaDto: UpdateMunicipiosEmpresaDto): string;
    remove(id: number): string;
}
