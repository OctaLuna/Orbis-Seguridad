import { PremiosService } from '../services/premios.service';
import { CreatePremioDto } from '../dto/create-premio.dto';
import { UpdatePremioDto } from '../dto/update-premio.dto';
export declare class PremiosController {
    private readonly premiosService;
    constructor(premiosService: PremiosService);
    create(createPremioDto: CreatePremioDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updatePremioDto: UpdatePremioDto): string;
    remove(id: string): string;
}
