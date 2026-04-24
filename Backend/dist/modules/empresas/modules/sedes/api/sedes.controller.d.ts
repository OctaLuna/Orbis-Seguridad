import { SedesService } from '../services/sedes.service';
import { CreateSedeDto } from '../dto/create-sede.dto';
import { UpdateSedeDto } from '../dto/update-sede.dto';
export declare class SedesController {
    private readonly sedesService;
    constructor(sedesService: SedesService);
    create(createSedeDto: CreateSedeDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateSedeDto: UpdateSedeDto): string;
    remove(id: string): string;
}
