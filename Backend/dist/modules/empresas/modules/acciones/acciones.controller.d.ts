import { AccionesService } from './acciones.service';
import { Response } from 'express';
export declare class AccionesController {
    private readonly accionesService;
    constructor(accionesService: AccionesService);
    findAll(res: Response): Promise<Response<any, Record<string, any>>>;
}
