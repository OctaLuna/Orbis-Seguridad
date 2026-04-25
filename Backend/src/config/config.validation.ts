// src/config/config.validation.ts (Versión Corregida)

import * as Joi from 'joi';

export const validationSchema = Joi.object({
    // Variables generales y de servidor
    NODE_ENV: Joi.string()
        .valid('development', 'production', 'test')
        .default('development'),
    PORT: Joi.number().default(3000),
    SHOW_ENV: Joi.boolean().default(false),
    PRINT_LOGS: Joi.boolean().default(false),
    FRONTEND_URL: Joi.string().required(), // Añadimos esta para la configuración de CORS

    // --- Lógica de Base de Datos Corregida ---
    // Para producción (ej. Render con Supabase)
    DATABASE_URL: Joi.string(),

    // Para desarrollo local (si no se usa DATABASE_URL)
    DB_TYPE: Joi.string(),
    DB_HOST: Joi.string(),
    DB_PORT: Joi.number(),
    DB_USER: Joi.string(),
    DB_PASSWORD: Joi.string(),
    DB_NAME: Joi.string(),
    DB_LOGS: Joi.boolean().default(false),

    // Variables de JWT
    ACTIVE_JWT: Joi.boolean().default(true),
    JWT_SECRET: Joi.string().required(),
    JWT_TIME_EXPIRE: Joi.string().required(),

    // Seguridad de contraseñas
    PASSWORD_EXPIRY_DAYS:        Joi.number().default(60),
    PASSWORD_HISTORY_COUNT:      Joi.number().default(10),
    MAX_LOGIN_ATTEMPTS:          Joi.number().default(3),
    LOCKOUT_MINUTES:             Joi.number().default(30),
    RESET_TOKEN_EXPIRES_MINUTES: Joi.number().default(30),
})
.or('DATABASE_URL', 'DB_HOST');
// Le dice a la validación: "O la variable DATABASE_URL debe existir, o DB_HOST debe existir".
// Esto hace que la validación sea flexible para ambos entornos.