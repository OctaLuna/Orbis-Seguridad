"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolicitudesTemporalesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const solicitud_temporal_entity_1 = require("../entities/solicitud-temporal.entity");
const email_service_1 = require("../../../../shared/services/email/email.service");
const usuarios_auth_service_1 = require("../../../../modules/usuarios/services/usuarios-auth.service");
const solicitud_aprobada_template_1 = require("../templates/solicitud-aprobada.template");
const typeorm_3 = require("typeorm");
const solicitud_rechazada_template_1 = require("../templates/solicitud-rechazada.template");
let SolicitudesTemporalesService = class SolicitudesTemporalesService {
    solicitudTemporalRepository;
    usuariosAuthService;
    emailService;
    dataSource;
    constructor(solicitudTemporalRepository, usuariosAuthService, emailService, dataSource) {
        this.solicitudTemporalRepository = solicitudTemporalRepository;
        this.usuariosAuthService = usuariosAuthService;
        this.emailService = emailService;
        this.dataSource = dataSource;
    }
    async create(dto) {
        const fechaUsoDate = new Date(dto.fechaUso);
        if (isNaN(fechaUsoDate.getTime())) {
            throw new common_1.BadRequestException({
                message: 'fechaUso inválida; envía un ISO 8601 válido, ej: 2025-09-16T10:30:00Z'
            });
        }
        const entity = this.solicitudTemporalRepository.create({
            correo: dto.correo.trim(),
            justificacion: dto.justificacion.trim(),
            fechaUso: fechaUsoDate,
        });
        const saved = await this.solicitudTemporalRepository.save(entity);
        return saved;
    }
    async aprobarSolicitud(idSolicitud) {
        const soli = await this.solicitudTemporalRepository.findOne({
            where: {
                id: idSolicitud,
                esAprobado: (0, typeorm_2.IsNull)()
            }
        });
        if (!soli) {
            throw new common_1.NotFoundException({
                message: 'Solicitud invalida para aprobar'
            });
        }
        return this.dataSource.transaction(async (manager) => {
            const usuario = await soli.correo.split('@')[0];
            const newUsuario = await this.usuariosAuthService.createTemporal({
                correo: soli.correo,
                usuario: usuario,
                contrasenia: usuario,
                expiracion: soli.fechaUso
            }, manager);
            soli.esAprobado = true;
            const template = (0, solicitud_aprobada_template_1.getHtmlSolcitudAprobada)(usuario, soli.correo, soli.fechaUso);
            const soliSaved = await manager.getRepository(solicitud_temporal_entity_1.SolicitudTemporal).save(soli);
            await this.emailService.sendEmail({
                to: soli.correo,
                subject: 'Aprobacion de cuenta temporal',
                html: template
            });
            return soliSaved;
        });
    }
    async rechazarSolicitud(idSolicitud, motivo) {
        const soli = await this.solicitudTemporalRepository.findOne({
            where: {
                id: idSolicitud,
                esAprobado: (0, typeorm_2.IsNull)()
            }
        });
        if (!soli) {
            throw new common_1.NotFoundException({
                message: 'Solicitud invalida para rechzar'
            });
        }
        soli.esAprobado = false;
        const template = (0, solicitud_rechazada_template_1.getHtmlSolicitudRechazada)(soli.correo, motivo);
        const soliSaved = await this.solicitudTemporalRepository.save(soli);
        await this.emailService.sendEmail({
            to: soli.correo,
            subject: 'Rechazo de cuenta temporal',
            html: template
        });
        return soliSaved;
    }
    async findOne(id) {
        const found = await this.solicitudTemporalRepository.findOne({
            where: {
                id: id
            }
        });
        if (!found)
            throw new common_1.NotFoundException(`Solicitud temporal ${id} no encontrada`);
        return found;
    }
    async findAll(params) {
        const { page, limit, esAprobado, correo, orderFecha, fechaDesde, fechaHasta } = params;
        const where = {};
        if (esAprobado === true || esAprobado === false) {
            where.esAprobado = esAprobado;
        }
        else if (esAprobado === null) {
            where.esAprobado = (0, typeorm_2.IsNull)();
        }
        if (correo) {
            where.correo = (0, typeorm_2.ILike)(`%${correo}%`);
        }
        if (fechaDesde && fechaHasta) {
            where.fecha = (0, typeorm_2.Between)(fechaDesde, fechaHasta);
        }
        else if (fechaDesde) {
            where.fecha = (0, typeorm_2.MoreThanOrEqual)(fechaDesde);
        }
        else if (fechaHasta) {
            where.fecha = (0, typeorm_2.LessThanOrEqual)(fechaHasta);
        }
        const [data, total] = await this.solicitudTemporalRepository.findAndCount({
            where,
            order: { fecha: orderFecha },
            skip: (page - 1) * limit,
            take: limit,
        });
        return {
            data,
            page,
            limit,
            pages: Math.ceil(total / limit),
            total,
        };
    }
};
exports.SolicitudesTemporalesService = SolicitudesTemporalesService;
exports.SolicitudesTemporalesService = SolicitudesTemporalesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(solicitud_temporal_entity_1.SolicitudTemporal)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        usuarios_auth_service_1.UsuariosAuthService,
        email_service_1.EmailService,
        typeorm_3.DataSource])
], SolicitudesTemporalesService);
//# sourceMappingURL=solicitudes-temporales.service.js.map