import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { MyConfigModule } from './config/config.module';
import { MyConfigService } from './config/config.service';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(MyConfigService); // Obtenemos el servicio de configuración

    // Habilitamos el "shutdown hook" para que Nest cierre conexiones correctamente
    app.enableShutdownHooks();

    // En desarrollo acepta cualquier localhost; en producción solo la URL configurada
    const isDev = configService.get('NODE_ENV') !== 'production';
    app.enableCors({
        origin: isDev
            ? (origin, callback) => callback(null, true)
            : configService.get('FRONTEND_URL'),
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });

    app.useGlobalPipes(new ValidationPipe({
        transform: true
    }));

    // Desactivamos Swagger en producción por seguridad
    if (configService.get('NODE_ENV') !== 'production') {
        const config = new DocumentBuilder()
            .setTitle('Backend del Bicentenario')
            .setDescription('Documentación de la API del proyecto Bicentenario')
            .setVersion('1.0')
            .addBearerAuth(
                {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
                'access-token',
            )
            .build();
        const document = SwaggerModule.createDocument(app, config);
        SwaggerModule.setup('api/documentation', app, document);
    }

    // El puerto se lee desde las variables de entorno (esto ya lo tenías y es correcto)
    await app.listen(configService.get('PORT') ?? 3000);
}
bootstrap();