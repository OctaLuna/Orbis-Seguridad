import { ImplementacionesService } from '../services/implementaciones.service';
import { CreateImplementacioneDto } from '../dto/create-implementacione.dto';
import { UpdateImplementacioneDto } from '../dto/update-implementacione.dto';
export declare class ImplementacionesController {
    private readonly implementacionesService;
    constructor(implementacionesService: ImplementacionesService);
    create(createImplementacioneDto: CreateImplementacioneDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateImplementacioneDto: UpdateImplementacioneDto): string;
    remove(id: string): string;
}
