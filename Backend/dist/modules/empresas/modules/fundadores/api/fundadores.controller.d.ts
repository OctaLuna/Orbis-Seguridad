import { FundadoresService } from '../services/fundadores.service';
import { UpdateFundadoreDto } from '../dto/update-fundadore.dto';
export declare class FundadoresController {
    private readonly fundadoresService;
    constructor(fundadoresService: FundadoresService);
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateFundadoreDto: UpdateFundadoreDto): string;
    remove(id: string): string;
}
