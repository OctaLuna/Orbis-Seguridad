"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailModule = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
const path_1 = require("path");
const email_service_1 = require("./email.service");
const email_config_1 = require("../../../config/services/email.config");
let EmailModule = class EmailModule {
};
exports.EmailModule = EmailModule;
exports.EmailModule = EmailModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mailer_1.MailerModule.forRootAsync({
                inject: [email_config_1.MyEmailConfig],
                useFactory: async (emailConfig) => ({
                    transport: {
                        host: 'smtp.gmail.com',
                        port: 587,
                        auth: emailConfig.get()
                    },
                    defaults: {
                        from: '"No Reply" <noreply@ejemplo.com>',
                    },
                    template: {
                        dir: (0, path_1.join)(__dirname, 'templates'),
                        options: {
                            strict: true,
                        },
                    },
                })
            }),
        ],
        providers: [email_service_1.EmailService],
        exports: [email_service_1.EmailService],
    })
], EmailModule);
//# sourceMappingURL=email.module.js.map