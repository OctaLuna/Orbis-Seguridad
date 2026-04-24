"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyConfigModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const config_service_1 = require("./config.service");
const database_config_1 = require("./services/database.config");
const jwt_config_1 = require("./services/jwt.config");
const server_config_1 = require("./services/server.config");
const config_validation_1 = require("./config.validation");
const email_config_1 = require("./services/email.config");
let MyConfigModule = class MyConfigModule {
};
exports.MyConfigModule = MyConfigModule;
exports.MyConfigModule = MyConfigModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
                validationSchema: config_validation_1.validationSchema
            }),
        ],
        providers: [
            config_service_1.MyConfigService,
            database_config_1.MyDataBaseConfig,
            jwt_config_1.MyJwtConfig,
            server_config_1.MyServerConfig,
            email_config_1.MyEmailConfig,
        ],
        exports: [
            config_service_1.MyConfigService,
            database_config_1.MyDataBaseConfig,
            jwt_config_1.MyJwtConfig,
            server_config_1.MyServerConfig,
            email_config_1.MyEmailConfig
        ],
    })
], MyConfigModule);
//# sourceMappingURL=config.module.js.map