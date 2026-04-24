import { MunicipiosService } from '../services/municipios.service';
import { Response } from 'express';
export declare class MunicipiosController {
    private readonly municipiosService;
    constructor(municipiosService: MunicipiosService);
    findAll(departamentos: number[], res: Response): Promise<Response<any, Record<string, any>>>;
}
