import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { MyConfigService } from "src/config/config.service";
import { RolesService } from "src/modules/usuarios/modules/roles/services/roles.service";
import { RolesEnum } from "src/shared/constants/roles.const";
import { EmailService } from "src/shared/services/email/email.service";

@Injectable()
export class AppTask {
    constructor(
        private readonly rolesService: RolesService,
        private readonly emailService: EmailService,
        private readonly myConfigService: MyConfigService
    ){}

    @Cron(CronExpression.EVERY_DAY_AT_3PM,{
        name: 'refresh-database',
        timeZone: 'America/La_Paz'
    })
    async refreshDataBase(){
        const rol = await this.rolesService.update(
            RolesEnum.VISITANTE,
            {
                nombre: `Visitante-${(new Date()).toLocaleString()}`
            }
        );
        console.log("#DB refresh#")
        
        const emails = this.myConfigService.get<string>('REFRESH_EMAILS');
        if (!emails || emails === undefined || emails === null || emails === ''){
            return;
        }
        const emailsSend = emails.split(',');
        await this.emailService.sendEmail({
            to: emailsSend,
            subject: 'Recarga de base de datos',
            text: `Consulta realizada a la base de datos, registro: ${rol.nombre}`
        })
    }
}