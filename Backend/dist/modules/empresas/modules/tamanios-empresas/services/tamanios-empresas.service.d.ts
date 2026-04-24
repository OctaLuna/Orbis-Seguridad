import { CreateTamaniosEmpresaDto } from '../dto/create-tamanios-empresa.dto';
import { UpdateTamaniosEmpresaDto } from '../dto/update-tamanios-empresa.dto';
import { TamanioEmpresa } from '../entities/tamanio-empresa.entity';
import { Repository } from 'typeorm';
import { OptionsFindOne } from 'src/common/classes';
export declare class TamaniosEmpresasService {
    private readonly tamanioEmpresaRepository;
    constructor(tamanioEmpresaRepository: Repository<TamanioEmpresa>);
    create(createTamaniosEmpresaDto: CreateTamaniosEmpresaDto): string;
    findAll(): Promise<TamanioEmpresa[]>;
    findOne(id: number, options?: OptionsFindOne): Promise<TamanioEmpresa | null>;
    update(id: number, updateTamaniosEmpresaDto: UpdateTamaniosEmpresaDto): string;
    remove(id: number): string;
}
