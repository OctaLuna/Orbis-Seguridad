import { CreateTiposAccioneDto } from '../dto/create-tipos-accione.dto';
import { UpdateTiposAccioneDto } from '../dto/update-tipos-accione.dto';
import { TipoAccion } from '../entities/tipo-accion.entity';
import { Repository } from 'typeorm';
export declare class TiposAccionesService {
    private readonly tipoAccionRepository;
    constructor(tipoAccionRepository: Repository<TipoAccion>);
    create(createTiposAccioneDto: CreateTiposAccioneDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateTiposAccioneDto: UpdateTiposAccioneDto): string;
    remove(id: number): string;
}
