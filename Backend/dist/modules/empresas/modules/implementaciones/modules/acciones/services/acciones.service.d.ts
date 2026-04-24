import { CreateAccioneDto } from '../dto/create-accione.dto';
import { UpdateAccioneDto } from '../dto/update-accione.dto';
import { Accion } from '../entities/accion.entity';
import { Repository } from 'typeorm';
export declare class AccionesService {
    private readonly accionRepository;
    constructor(accionRepository: Repository<Accion>);
    create(createAccioneDto: CreateAccioneDto): string;
    findManyByIds(ids: number[]): Promise<Accion[]>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateAccioneDto: UpdateAccioneDto): string;
    remove(id: number): string;
}
