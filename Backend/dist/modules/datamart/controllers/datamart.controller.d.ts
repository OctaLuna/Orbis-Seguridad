import { DatamartService } from '../services/datamart.service';
import { Response } from 'express';
export declare class DatamartController {
    private readonly datamartService;
    constructor(datamartService: DatamartService);
    findAll(res: Response): Promise<Response<any, Record<string, any>>>;
}
