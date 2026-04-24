import { EmpresasService } from '../services/empresas.service';
import { Response } from 'express';
import { FindAllEmpresasCardsParamsDto } from '../dto/inputs/find-all-empresas-cards-params.dto';
import { FindAllEmpresasCardsPublicParamsDto } from '../dto/inputs/find-all-empresas-cards-public-params.dto';
export declare class EmpresasController {
    private readonly empresasService;
    constructor(empresasService: EmpresasService);
    findAll(res: Response): Promise<Response<any, Record<string, any>>>;
    findAllCardsPublic(params: FindAllEmpresasCardsPublicParamsDto, res: Response): Promise<Response<any, Record<string, any>>>;
    findAllCardsPrivate(params: FindAllEmpresasCardsParamsDto, res: Response): Promise<Response<any, Record<string, any>>>;
    findOnePublic(idEmpresa: number, res: Response): Promise<Response<any, Record<string, any>>>;
    findOnePrivate(idEmpresa: number, res: Response): Promise<Response<any, Record<string, any>>>;
}
