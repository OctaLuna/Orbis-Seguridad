import { AccionesService } from '../services/acciones.service';
import { CreateAccioneDto } from '../dto/create-accione.dto';
import { UpdateAccioneDto } from '../dto/update-accione.dto';
export declare class AccionesController {
    private readonly accionesService;
    constructor(accionesService: AccionesService);
    create(createAccioneDto: CreateAccioneDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateAccioneDto: UpdateAccioneDto): string;
    remove(id: string): string;
}
