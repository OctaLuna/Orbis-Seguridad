import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { MyConfigService } from './config.service';
import { MyDataBaseConfig } from './services/database.config';
import { MyJwtConfig } from './services/jwt.config';
import { MyServerConfig } from './services/server.config';
import { validationSchema } from './config.validation';
import { MyEmailConfig } from './services/email.config';

@Global()
@Module({
    imports: [
        NestConfigModule.forRoot({
            isGlobal: true,
            envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
            validationSchema
        }),
    ],
    providers: [
        MyConfigService,
        MyDataBaseConfig,
        MyJwtConfig,
        MyServerConfig,
        MyEmailConfig,
    ],
    exports: [
        MyConfigService,
        MyDataBaseConfig,
        MyJwtConfig,
        MyServerConfig,
        MyEmailConfig
    ],
})
export class MyConfigModule { }