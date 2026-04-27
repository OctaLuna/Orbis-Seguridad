import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailService } from './email.service';
import { MyEmailConfig } from 'src/config/services/email.config';


@Module({
	imports: [
		MailerModule.forRootAsync({
			inject: [MyEmailConfig],
			useFactory: async (emailConfig: MyEmailConfig) => {
				const { user, pass } = emailConfig.get();
				console.log(`[EmailModule] SMTP user=${user ?? '(no configurado)'}`);
				return {
					transport: {
						host: 'smtp.gmail.com',
						port: 587,
						secure: false,
						auth: { user, pass },
						tls: { rejectUnauthorized: false },
					},
					defaults: {
						from: `"Orbis" <${user ?? 'noreply@orbis.com'}>`,
					},
				};
			}

		}),
	],
	providers: [EmailService],
	exports: [EmailService],
})
export class EmailModule { }
