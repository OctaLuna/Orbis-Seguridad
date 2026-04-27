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
    enviarCuentaBloqueada(correo: string, usuario: string): Promise<void>;
    enviarResetPassword(correo: string, resetUrl: string, expiresInMinutes: number): Promise<void>;
    enviarPasswordCambiada(correo: string): Promise<void>;
    enviarPasswordExpirada(correo: string, usuario: string): Promise<void>;
    enviarAccesoFormularioExterno(correoReal: string, alias: string, pwd: string, formularioUrl: string): Promise<void>;
    enviarPasswordTemporal(correoReal: string, alias: string, pwd: string): Promise<void>;
}
export {};
