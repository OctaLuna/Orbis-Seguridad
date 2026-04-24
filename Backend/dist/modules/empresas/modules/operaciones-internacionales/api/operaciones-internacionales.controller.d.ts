import { OperacionesInternacionalesService } from '../services/operaciones-internacionales.service';
import { CreateOperacionesInternacionaleDto } from '../dto/create-operaciones-internacionale.dto';
import { UpdateOperacionesInternacionaleDto } from '../dto/update-operaciones-internacionale.dto';
export declare class OperacionesInternacionalesController {
    private readonly operacionesInternacionalesService;
    constructor(operacionesInternacionalesService: OperacionesInternacionalesService);
    create(createOperacionesInternacionaleDto: CreateOperacionesInternacionaleDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateOperacionesInternacionaleDto: UpdateOperacionesInternacionaleDto): string;
    remove(id: string): string;
}
