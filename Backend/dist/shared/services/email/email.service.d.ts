import { MailerService } from '@nestjs-modules/mailer';
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
export declare class EmailService {
    private readonly mailerService;
    constructor(mailerService: MailerService);
    private sendEmailAsync;
    sendEmail(options: EmailOptions): Promise<void>;
}
export {};
