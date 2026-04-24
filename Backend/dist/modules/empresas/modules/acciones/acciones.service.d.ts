import { Repository } from 'typeorm';
import { Accion } from './entities/accione.entity';
export declare class AccionesService {
    private readonly accionRepository;
    constructor(accionRepository: Repository<Accion>);
    findAll(): Promise<Accion[]>;
}
