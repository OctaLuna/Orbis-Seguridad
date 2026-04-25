import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { validateData } from 'src/common/utils';

interface EmailAttachment {
	filename: string;
	content: Buffer | string;
	contentType?: string;
}

interface EmailOptions {
	to: string | string[];
	subject: string;
	text?: string;
	html?: string;
	attachments?: EmailAttachment[];
	template?: string;
	context?: Record<string, any>;
}

@Injectable()
export class EmailService {
	constructor(private readonly mailerService: MailerService) { }
	private async sendEmailAsync(options: EmailOptions): Promise<void> {
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
		} catch (error) {
		}
	}
	async sendEmail(options: EmailOptions): Promise<void> {
		setImmediate(() => {
			this.sendEmailAsync(options);
		});
	}

	async enviarCuentaBloqueada(correo: string, usuario: string): Promise<void> {
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

	async enviarResetPassword(correo: string, resetUrl: string, expiresInMinutes: number): Promise<void> {
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

	async enviarPasswordCambiada(correo: string): Promise<void> {
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

	async enviarPasswordExpirada(correo: string, usuario: string): Promise<void> {
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

	async enviarPasswordTemporal(correoReal: string, alias: string, pwd: string): Promise<void> {
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
}
