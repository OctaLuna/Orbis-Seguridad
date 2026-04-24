import { CreateServicioDto } from '../dto/create-servicio.dto';
import { UpdateServicioDto } from '../dto/update-servicio.dto';
import { Servicio } from '../entities/servicio.entity';
import { EntityManager, Repository } from 'typeorm';
export declare class ServiciosService {
    private readonly servicioRepository;
    constructor(servicioRepository: Repository<Servicio>);
    create(createServicioDto: CreateServicioDto): string;
    createTransaction(manger: EntityManager, data: CreateServicioDto): Promise<({
        idEmpresa: number;
        nombre: string;
    } & Servicio)[]>;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateServicioDto: UpdateServicioDto): string;
    remove(id: number): string;
}
