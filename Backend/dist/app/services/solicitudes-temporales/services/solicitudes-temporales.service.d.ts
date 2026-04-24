import { Repository } from "typeorm";
import { SolicitudTemporal } from "../entities/solicitud-temporal.entity";
import { CreateSolicitudTemporalDto } from "../dto/create-solicitud-temporal.dto";
import { EmailService } from "src/shared/services/email/email.service";
import { FindAllSolicitudesParamsDto } from "../dto/find-all-solicitudes-params.dto";
import { UsuariosAuthService } from "src/modules/usuarios/services/usuarios-auth.service";
import { DataSource } from "typeorm";
export declare class SolicitudesTemporalesService {
    private readonly solicitudTemporalRepository;
    private readonly usuariosAuthService;
    private readonly emailService;
    private readonly dataSource;
    constructor(solicitudTemporalRepository: Repository<SolicitudTemporal>, usuariosAuthService: UsuariosAuthService, emailService: EmailService, dataSource: DataSource);
    create(dto: CreateSolicitudTemporalDto): Promise<SolicitudTemporal>;
    aprobarSolicitud(idSolicitud: number): Promise<SolicitudTemporal>;
    rechazarSolicitud(idSolicitud: number, motivo: string): Promise<SolicitudTemporal>;
    findOne(id: number): Promise<SolicitudTemporal>;
    findAll(params: FindAllSolicitudesParamsDto): Promise<{
        data: SolicitudTemporal[];
        page: number;
        limit: number;
        pages: number;
        total: number;
    }>;
}
