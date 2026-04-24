import { ProyectosService } from '../services/proyectos.service';
import { CreateProyectoDto } from '../dto/create-proyecto.dto';
import { UpdateProyectoDto } from '../dto/update-proyecto.dto';
export declare class ProyectosController {
    private readonly proyectosService;
    constructor(proyectosService: ProyectosService);
    create(createProyectoDto: CreateProyectoDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateProyectoDto: UpdateProyectoDto): string;
    remove(id: string): string;
}
