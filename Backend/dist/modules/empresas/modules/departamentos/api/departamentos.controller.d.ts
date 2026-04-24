import { DepartamentosService } from '../services/departamentos.service';
import { Response } from 'express';
export declare class DepartamentosController {
    private readonly departamentosService;
    constructor(departamentosService: DepartamentosService);
    findAll(res: Response): Promise<Response<any, Record<string, any>>>;
}
