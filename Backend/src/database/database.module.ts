// src/database/database.module.ts (Versión modificada para Supabase)
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MyConfigModule } from 'src/config/config.module';
import { MyDataBaseConfig } from 'src/config/services/database.config';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [MyConfigModule],
            inject: [MyDataBaseConfig],
            useFactory: (configService: MyDataBaseConfig) => {
                // Priorizamos la URL de conexión para entornos de producción/staging
                if (process.env.DATABASE_URL) {
                    return {
                        type: 'postgres',
                        url: process.env.DATABASE_URL,
                        autoLoadEntities: true,
                        synchronize: false,
                        logging: false, // Logging en producción generalmente es false
                        ssl: {
                            rejectUnauthorized: false, // Requerido para Supabase y otros proveedores
                        },
                    };
                }

                // Mantenemos la configuración antigua como fallback para desarrollo local si es necesario
                const dbConfig = configService.get();
                return {
                    type: 'postgres',
                    host: dbConfig.host,
                    port: dbConfig.port,
                    username: dbConfig.username,
                    password: dbConfig.password,
                    database: dbConfig.database,
                    autoLoadEntities: true,
                    synchronize: false,
                    logging: dbConfig.logging ?? false,
                };
            },
        }),
    ],
})
export class DatabaseModule { }