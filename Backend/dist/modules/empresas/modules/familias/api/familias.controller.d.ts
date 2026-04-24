import { FamiliasService } from '../services/familias.service';
import { CreateFamiliaDto } from '../dto/create-familia.dto';
import { UpdateFamiliaDto } from '../dto/update-familia.dto';
export declare class FamiliasController {
    private readonly familiasService;
    constructor(familiasService: FamiliasService);
    create(createFamiliaDto: CreateFamiliaDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateFamiliaDto: UpdateFamiliaDto): string;
    remove(id: string): string;
}
