import { RubrosService } from '../services/rubros.service';
import { Response } from 'express';
export declare class RubrosController {
    private readonly rubrosService;
    constructor(rubrosService: RubrosService);
    findAll(res: Response): Promise<Response<any, Record<string, any>>>;
}
