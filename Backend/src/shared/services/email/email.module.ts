import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { EmailService } from './email.service';
import { MyEmailConfig } from 'src/config/services/email.config';


@Module({
	imports: [
		MailerModule.forRootAsync({
			inject: [MyEmailConfig],
			useFactory: async (emailConfig: MyEmailConfig) => ({
				transport: {
					host: 'smtp.gmail.com',
					port: 587,
					auth: emailConfig.get()
				},
				defaults: {
					from: '"No Reply" <noreply@ejemplo.com>',
				},
				template: {
					dir: join(__dirname, 'templates'),
					options: {
						strict: true,
					},
				},
			})

		}),
	],
	providers: [EmailService],
	exports: [EmailService],
})
export class EmailModule { }
