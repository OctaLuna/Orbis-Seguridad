import { PaisesService } from '../services/paises.service';
import { Response } from 'express';
export declare class PaisesController {
    private readonly paisesService;
    constructor(paisesService: PaisesService);
    findAll(res: Response): Promise<Response<any, Record<string, any>>>;
}
