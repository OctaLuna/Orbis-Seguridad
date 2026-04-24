import { TiposSocietariosService } from '../services/tipos-societarios.service';
import { Response } from 'express';
export declare class TiposSocietariosController {
    private readonly tiposSocietariosService;
    constructor(tiposSocietariosService: TiposSocietariosService);
    findAll(res: Response): Promise<Response<any, Record<string, any>>>;
}
