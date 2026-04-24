import { Response } from 'express';
import { SolicitudesTemporalesService } from '../services/solicitudes-temporales.service';
import { CreateSolicitudTemporalDto } from '../dto/create-solicitud-temporal.dto';
import { FindAllSolicitudesParamsDto } from '../dto/find-all-solicitudes-params.dto';
import { RechazarSolicitudDto } from '../dto/rechzar-solicitud.dto';
export declare class SolicitudesTemporalesController {
    private readonly service;
    constructor(service: SolicitudesTemporalesService);
    create(dto: CreateSolicitudTemporalDto, res: Response): Promise<Response<any, Record<string, any>>>;
    findAll(params: FindAllSolicitudesParamsDto, res: Response): Promise<Response<any, Record<string, any>>>;
    findOne(id: number, res: Response): Promise<Response<any, Record<string, any>>>;
    aprobarSolicitud(idSolicitud: number, res: Response): Promise<Response<any, Record<string, any>>>;
    rechazarSolicitud(idSolicitud: number, data: RechazarSolicitudDto, res: Response): Promise<Response<any, Record<string, any>>>;
}
