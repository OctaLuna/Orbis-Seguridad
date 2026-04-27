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

    // En desarrollo acepta cualquier origen; en producción solo los orígenes configurados
    const isDev = configService.get('NODE_ENV') !== 'production';
    const allowedOrigins: (string | RegExp)[] = isDev
        ? []
        : (configService.get<string>('FRONTEND_URL') ?? '')
              .split(',')
              .map((u) => u.trim())
              .filter(Boolean);

    app.enableCors({
        origin: isDev
            ? (origin, callback) => callback(null, true)
            : (origin, callback) => {
                  if (!origin || allowedOrigins.some((o) =>
                      typeof o === 'string' ? o === origin : o.test(origin)
                  )) {
                      callback(null, true);
                  } else {
                      callback(new Error(`CORS: origen no permitido → ${origin}`));
                  }
              },
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
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