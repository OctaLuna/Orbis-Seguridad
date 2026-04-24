import { HitosService } from '../services/hitos.service';
import { CreateHitoDto } from '../dto/create-hito.dto';
import { UpdateHitoDto } from '../dto/update-hito.dto';
export declare class HitosController {
    private readonly hitosService;
    constructor(hitosService: HitosService);
    create(createHitoDto: CreateHitoDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateHitoDto: UpdateHitoDto): string;
    remove(id: string): string;
}
