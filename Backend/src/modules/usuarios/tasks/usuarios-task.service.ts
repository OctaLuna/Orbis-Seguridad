import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Usuario } from "../entities/usuario.entity";
import { IsNull, LessThanOrEqual, Not, Repository } from "typeorm";
import { Cron, CronExpression } from "@nestjs/schedule";
import { RolesEnum } from "src/shared/constants/roles.const";
import { EmailService } from "src/shared/services/email/email.service";

@Injectable()
export class UsuariosTaskService {
    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,
        private readonly emailService: EmailService,
    ) {}

    // Elimina cuentas temporales expiradas (cron existente, sin cambios)
    @Cron(CronExpression.EVERY_DAY_AT_3AM, {
        name: 'eliminar-expirados',
        timeZone: 'America/La_Paz'
    })
    async eliminarUsuarioExpirados() {
        const usuarios = await this.usuarioRepository.find({
            where: {
                idRol: RolesEnum.TEMPORAL,
                expiracion: LessThanOrEqual(new Date())
            }
        });
        if (usuarios && usuarios.length > 0) {
            await this.usuarioRepository.remove(usuarios);
        }
    }

    // M-11: Marca como expiradas las contraseñas vencidas y notifica al usuario
    @Cron('0 7 * * *', {
        name: 'notificar-passwords-expiradas',
        timeZone: 'America/La_Paz'
    })
    async notificarPasswordsExpiradas() {
        const usuarios = await this.usuarioRepository.find({
            where: {
                passwordExpiresAt: LessThanOrEqual(new Date()),
                mustChangePassword: false,
                isLocked: false,
            },
            select: ['id', 'usuario', 'correoReal', 'correo'],
        });

        for (const usuario of usuarios) {
            await this.usuarioRepository.update(usuario.id, { mustChangePassword: true });
            const correo = usuario.correoReal || usuario.correo;
            if (correo) {
                this.emailService.enviarPasswordExpirada(correo, usuario.usuario);
            }
        }
    }

    // M-11: Limpia reset tokens expirados para mantener la tabla limpia
    @Cron('0 2 * * *', {
        name: 'limpiar-tokens-reset',
        timeZone: 'America/La_Paz'
    })
    async limpiarTokensResetExpirados() {
        await this.usuarioRepository
            .createQueryBuilder()
            .update(Usuario)
            .set({
                resetToken: () => 'NULL',
                resetTokenExpires: () => 'NULL',
            })
            .where('reset_token_expires <= :ahora', { ahora: new Date() })
            .andWhere('reset_token IS NOT NULL')
            .execute();
    }
}
