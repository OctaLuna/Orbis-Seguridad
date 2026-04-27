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
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const mailer_1 = require("@nestjs-modules/mailer");
let EmailService = class EmailService {
    mailerService;
    constructor(mailerService) {
        this.mailerService = mailerService;
    }
    async sendEmailAsync(options) {
        try {
            const { to, subject, text, html, attachments, template, context } = options;
            await this.mailerService.sendMail({
                to,
                subject,
                text,
                html,
                template,
                context,
                attachments: attachments?.map((att) => ({
                    filename: att.filename,
                    content: att.content,
                    contentType: att.contentType,
                })),
            });
        }
        catch (error) {
        }
    }
    async sendEmail(options) {
        setImmediate(() => {
            this.sendEmailAsync(options);
        });
    }
    async enviarCuentaBloqueada(correo, usuario) {
        await this.sendEmail({
            to: correo,
            subject: 'Orbis — Tu cuenta ha sido bloqueada',
            html: `
				<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
					<h2 style="color: #c0392b;">Cuenta bloqueada temporalmente</h2>
					<p>Hola <strong>${usuario}</strong>,</p>
					<p>Tu cuenta fue bloqueada por múltiples intentos de inicio de sesión fallidos.</p>
					<p>Podrás intentar nuevamente después del período de bloqueo, o contactar a un administrador para desbloquearla de inmediato.</p>
					<p style="color: #7f8c8d; font-size: 12px;">Si no fuiste tú, cambia tu contraseña en cuanto puedas acceder.</p>
				</div>
			`,
        });
    }
    async enviarResetPassword(correo, resetUrl, expiresInMinutes) {
        await this.sendEmail({
            to: correo,
            subject: 'Orbis — Recuperación de contraseña',
            html: `
				<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
					<h2 style="color: #1a1a2e;">Restablecer contraseña</h2>
					<p>Recibimos una solicitud para restablecer la contraseña de tu cuenta.</p>
					<p>Haz clic en el siguiente botón para crear una nueva contraseña. El enlace expirará en <strong>${expiresInMinutes} minutos</strong>.</p>
					<div style="text-align: center; margin: 24px 0;">
						<a href="${resetUrl}" style="background: #F29E38; color: #fff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold;">
							Restablecer contraseña
						</a>
					</div>
					<p style="color: #7f8c8d; font-size: 12px;">Si no solicitaste esto, ignora este correo. Tu contraseña no cambiará.</p>
				</div>
			`,
        });
    }
    async enviarPasswordCambiada(correo) {
        await this.sendEmail({
            to: correo,
            subject: 'Orbis — Tu contraseña fue cambiada',
            html: `
				<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
					<h2 style="color: #27ae60;">Contraseña actualizada</h2>
					<p>Tu contraseña fue cambiada exitosamente.</p>
					<p>Si no realizaste este cambio, contacta inmediatamente a un administrador.</p>
				</div>
			`,
        });
    }
    async enviarPasswordExpirada(correo, usuario) {
        await this.sendEmail({
            to: correo,
            subject: 'Orbis — Tu contraseña ha expirado',
            html: `
				<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
					<h2 style="color: #e67e22;">Contraseña expirada</h2>
					<p>Hola <strong>${usuario}</strong>,</p>
					<p>Tu contraseña ha expirado. Deberás crear una nueva contraseña la próxima vez que inicies sesión.</p>
					<p>El sistema te redirigirá automáticamente al formulario de cambio de contraseña.</p>
				</div>
			`,
        });
    }
    async enviarAccesoFormularioExterno(correoReal, alias, pwd, formularioUrl) {
        await this.sendEmail({
            to: correoReal,
            subject: 'Orbis — Tu cuenta y acceso al formulario de empresas',
            html: `
				<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
					<h2 style="color: #1a1a2e;">Bienvenido a Orbis</h2>
					<p>Tu cuenta ha sido creada. Tus credenciales de acceso son:</p>
					<div style="background: #f4f4f4; padding: 16px; border-radius: 8px; margin: 16px 0;">
						<p><strong>Usuario:</strong> ${alias}@orbis.com</p>
						<p><strong>Contraseña temporal:</strong>
						   <code style="font-size: 16px; color: #e74c3c;">${pwd}</code></p>
					</div>
					<p>⚠️ <strong>Esta contraseña es temporal.</strong> Al ingresar, serás redirigido a cambiarla.</p>
					<hr style="margin: 24px 0; border: none; border-top: 1px solid #eee;" />
					<h3 style="color: #0f2c4a;">Acceso al formulario de registro de empresas</h3>
					<p>También tienes acceso al formulario externo de registro de empresas:</p>
					<div style="text-align: center; margin: 20px 0;">
						<a href="${formularioUrl}"
						   style="background: #F29E38; color: #fff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold;">
							Abrir formulario de empresas
						</a>
					</div>
					<p style="color: #7f8c8d; font-size: 12px;">Este correo es confidencial. No lo compartas con nadie.</p>
				</div>
			`,
        });
    }
    async enviarPasswordTemporal(correoReal, alias, pwd) {
        await this.sendEmail({
            to: correoReal,
            subject: 'Orbis — Tu cuenta ha sido creada',
            html: `
				<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
					<h2 style="color: #1a1a2e;">Bienvenido a Orbis</h2>
					<p>Tu cuenta ha sido creada. Tus credenciales de acceso son:</p>
					<div style="background: #f4f4f4; padding: 16px; border-radius: 8px; margin: 16px 0;">
						<p><strong>Usuario:</strong> ${alias}@orbis.com</p>
						<p><strong>Contraseña temporal:</strong>
						   <code style="font-size: 16px; color: #e74c3c;">${pwd}</code></p>
					</div>
					<p>⚠️ <strong>Esta contraseña es temporal.</strong> Al ingresar, serás redirigido a cambiarla.</p>
					<p>Este correo es confidencial. No lo compartas con nadie.</p>
				</div>
			`,
        });
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], EmailService);
//# sourceMappingURL=email.service.js.map