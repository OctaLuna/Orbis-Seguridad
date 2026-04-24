import { ServiciosService } from '../services/servicios.service';
import { CreateServicioDto } from '../dto/create-servicio.dto';
import { UpdateServicioDto } from '../dto/update-servicio.dto';
export declare class ServiciosController {
    private readonly serviciosService;
    constructor(serviciosService: ServiciosService);
    create(createServicioDto: CreateServicioDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateServicioDto: UpdateServicioDto): string;
    remove(id: string): string;
}
