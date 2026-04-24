import { ImplementacionesAccionesService } from '../services/implementaciones-acciones.service';
import { CreateImplementacionesAccioneDto } from '../dto/create-implementaciones-accione.dto';
import { UpdateImplementacionesAccioneDto } from '../dto/update-implementaciones-accione.dto';
export declare class ImplementacionesAccionesController {
    private readonly implementacionesAccionesService;
    constructor(implementacionesAccionesService: ImplementacionesAccionesService);
    create(createImplementacionesAccioneDto: CreateImplementacionesAccioneDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateImplementacionesAccioneDto: UpdateImplementacionesAccioneDto): string;
    remove(id: string): string;
}
