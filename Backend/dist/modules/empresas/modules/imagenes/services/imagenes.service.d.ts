import { CreateImageneDto } from '../dto/create-imagene.dto';
import { UpdateImageneDto } from '../dto/update-imagene.dto';
import { Imagen } from '../entities/imagen.entity';
import { EntityManager, Repository } from 'typeorm';
export declare class ImagenesService {
    private readonly imagenRepository;
    constructor(imagenRepository: Repository<Imagen>);
    create(createImageneDto: CreateImageneDto): string;
    createTransaction(manger: EntityManager, data: CreateImageneDto): Promise<({
        idEmpresa: number;
        url: string;
    } & Imagen)[]>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateImageneDto: UpdateImageneDto): string;
    remove(id: number): string;
    getByEmpresaId(idEmpresa: number): Promise<Imagen[] | {
        mensaje: string;
    }>;
}
