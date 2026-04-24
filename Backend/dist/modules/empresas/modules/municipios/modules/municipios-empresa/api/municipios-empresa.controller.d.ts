import { MunicipiosEmpresaService } from '../services/municipios-empresa.service';
import { CreateMunicipiosEmpresaDto } from '../dto/create-municipios-empresa.dto';
import { UpdateMunicipiosEmpresaDto } from '../dto/update-municipios-empresa.dto';
export declare class MunicipiosEmpresaController {
    private readonly municipiosEmpresaService;
    constructor(municipiosEmpresaService: MunicipiosEmpresaService);
    create(createMunicipiosEmpresaDto: CreateMunicipiosEmpresaDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateMunicipiosEmpresaDto: UpdateMunicipiosEmpresaDto): string;
    remove(id: string): string;
}
