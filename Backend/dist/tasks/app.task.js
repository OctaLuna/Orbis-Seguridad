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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppTask = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const config_service_1 = require("../config/config.service");
const roles_service_1 = require("../modules/usuarios/modules/roles/services/roles.service");
const roles_const_1 = require("../shared/constants/roles.const");
const email_service_1 = require("../shared/services/email/email.service");
let AppTask = class AppTask {
    rolesService;
    emailService;
    myConfigService;
    constructor(rolesService, emailService, myConfigService) {
        this.rolesService = rolesService;
        this.emailService = emailService;
        this.myConfigService = myConfigService;
    }
    async refreshDataBase() {
        const rol = await this.rolesService.update(roles_const_1.RolesEnum.VISITANTE, {
            nombre: `Visitante-${(new Date()).toLocaleString()}`
        });
        console.log("#DB refresh#");
        const emails = this.myConfigService.get('REFRESH_EMAILS');
        if (!emails || emails === undefined || emails === null || emails === '') {
            return;
        }
        const emailsSend = emails.split(',');
        await this.emailService.sendEmail({
            to: emailsSend,
            subject: 'Recarga de base de datos',
            text: `Consulta realizada a la base de datos, registro: ${rol.nombre}`
        });
    }
};
exports.AppTask = AppTask;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_3PM, {
        name: 'refresh-database',
        timeZone: 'America/La_Paz'
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppTask.prototype, "refreshDataBase", null);
exports.AppTask = AppTask = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [roles_service_1.RolesService,
        email_service_1.EmailService,
        config_service_1.MyConfigService])
], AppTask);
//# sourceMappingURL=app.task.js.map