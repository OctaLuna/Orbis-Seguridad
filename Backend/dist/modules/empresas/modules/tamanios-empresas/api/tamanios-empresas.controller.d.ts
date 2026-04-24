import { TamaniosEmpresasService } from '../services/tamanios-empresas.service';
import { Response } from 'express';
export declare class TamaniosEmpresasController {
    private readonly tamaniosEmpresasService;
    constructor(tamaniosEmpresasService: TamaniosEmpresasService);
    findAll(res: Response): Promise<Response<any, Record<string, any>>>;
}
