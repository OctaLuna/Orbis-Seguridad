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
}
