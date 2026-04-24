import { CreateMunicipioDto } from '../dto/create-municipio.dto';
import { UpdateMunicipioDto } from '../dto/update-municipio.dto';
import { Municipio } from '../entities/municipio.entity';
import { Repository } from 'typeorm';
import { GetMunicipiosOptionsDto } from '../dto/get-municipios-options.dto';
export declare class MunicipiosService {
    private readonly muncipioRepository;
    constructor(muncipioRepository: Repository<Municipio>);
    create(createMunicipioDto: CreateMunicipioDto): string;
    findManybyIds(ids: number[]): Promise<Municipio[]>;
    findAll(options?: GetMunicipiosOptionsDto): Promise<Municipio[]>;
    findOne(id: number): string;
    update(id: number, updateMunicipioDto: UpdateMunicipioDto): string;
    remove(id: number): string;
}
