import { TiposAccionesService } from '../services/tipos-acciones.service';
import { CreateTiposAccioneDto } from '../dto/create-tipos-accione.dto';
import { UpdateTiposAccioneDto } from '../dto/update-tipos-accione.dto';
export declare class TiposAccionesController {
    private readonly tiposAccionesService;
    constructor(tiposAccionesService: TiposAccionesService);
    create(createTiposAccioneDto: CreateTiposAccioneDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateTiposAccioneDto: UpdateTiposAccioneDto): string;
    remove(id: string): string;
}
