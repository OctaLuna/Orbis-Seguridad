// ./services/solicitudes-temporales.service.ts
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, ILike, IsNull, LessThanOrEqual, MoreThanOrEqual, Repository } from "typeorm";
import { SolicitudTemporal } from "../entities/solicitud-temporal.entity";
import { CreateSolicitudTemporalDto } from "../dto/create-solicitud-temporal.dto";
import { EmailService } from "src/shared/services/email/email.service";
import { FindAllSolicitudesParamsDto } from "../dto/find-all-solicitudes-params.dto";
import { UsuariosAuthService } from "src/modules/usuarios/services/usuarios-auth.service";
import { hashPassword } from "src/common/utils";
import { getHtmlSolcitudAprobada } from "../templates/solicitud-aprobada.template";
import { DataSource } from "typeorm";
import { string, StringSchema } from "joi";
import { getHtmlSolicitudRechazada } from "../templates/solicitud-rechazada.template";

@Injectable()
export class SolicitudesTemporalesService {
    constructor(
        @InjectRepository(SolicitudTemporal)
        private readonly solicitudTemporalRepository: Repository<SolicitudTemporal>,
        private readonly usuariosAuthService: UsuariosAuthService,
        private readonly emailService: EmailService,
        private readonly dataSource: DataSource
    ) { }

    async create(dto: CreateSolicitudTemporalDto): Promise<SolicitudTemporal> {
        const fechaUsoDate = new Date(dto.fechaUso);
        if (isNaN(fechaUsoDate.getTime())) {
            throw new BadRequestException({
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

    async aprobarSolicitud(idSolicitud: number) {
        const soli = await this.solicitudTemporalRepository.findOne({
            where: {
                id: idSolicitud,
                esAprobado: IsNull()
            }
        });
        if (!soli) {
            throw new NotFoundException({
                message: 'Solicitud invalida para aprobar'
            })
        }
        return this.dataSource.transaction(async (manager) => {
            const usuario = await soli!.correo.split('@')[0];
            const newUsuario = await this.usuariosAuthService.createTemporal({
                correo: soli!.correo,
                usuario: usuario,
                contrasenia: usuario,
                expiracion: soli!.fechaUso
            }, manager);
            soli!.esAprobado = true;
            const template = getHtmlSolcitudAprobada(
                usuario,
                soli!.correo,
                soli!.fechaUso
            );
            const soliSaved = await manager.getRepository(SolicitudTemporal).save(soli!);
            await this.emailService.sendEmail({
                to: soli!.correo,
                subject: 'Aprobacion de cuenta temporal',
                html: template
            })
            return soliSaved;
        });

    }

    async rechazarSolicitud(idSolicitud: number, motivo: string) {
        const soli = await this.solicitudTemporalRepository.findOne({
            where: {
                id: idSolicitud,
                esAprobado: IsNull()
            }
        });
        if (!soli) {
            throw new NotFoundException({
                message: 'Solicitud invalida para rechzar'
            })
        }
        soli.esAprobado = false;
        const template = getHtmlSolicitudRechazada(soli!.correo, motivo);
        const soliSaved = await this.solicitudTemporalRepository.save(soli!);
        await this.emailService.sendEmail({
            to: soli!.correo,
            subject: 'Rechazo de cuenta temporal',
            html: template
        })
        return soliSaved;
    }

    async findOne(id: number): Promise<SolicitudTemporal> {
        const found = await this.solicitudTemporalRepository.findOne({
            where: {
                id: id
            }
        });
        if (!found) throw new NotFoundException(`Solicitud temporal ${id} no encontrada`);
        return found;
    }

    async findAll(params: FindAllSolicitudesParamsDto) {
        const { page, limit, esAprobado, correo, orderFecha, fechaDesde, fechaHasta } = params;

        const where: any = {};

        if (esAprobado === true || esAprobado === false) {
            where.esAprobado = esAprobado;
        } else if (esAprobado === null) {
            where.esAprobado = IsNull();
        }

        if (correo) {
            where.correo = ILike(`%${correo}%`);
        }

        if (fechaDesde && fechaHasta) {
            where.fecha = Between(fechaDesde, fechaHasta);
        } else if (fechaDesde) {
            where.fecha = MoreThanOrEqual(fechaDesde);
        } else if (fechaHasta) {
            where.fecha = LessThanOrEqual(fechaHasta);
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
}

