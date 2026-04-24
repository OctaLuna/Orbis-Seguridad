import { TiposAccionesImplementacionesService } from '../services/tipos-acciones-implementaciones.service';
import { CreateTiposAccionesImplementacioneDto } from '../dto/create-tipos-acciones-implementacione.dto';
import { UpdateTiposAccionesImplementacioneDto } from '../dto/update-tipos-acciones-implementacione.dto';
export declare class TiposAccionesImplementacionesController {
    private readonly tiposAccionesImplementacionesService;
    constructor(tiposAccionesImplementacionesService: TiposAccionesImplementacionesService);
    create(createTiposAccionesImplementacioneDto: CreateTiposAccionesImplementacioneDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateTiposAccionesImplementacioneDto: UpdateTiposAccionesImplementacioneDto): string;
    remove(id: string): string;
}
