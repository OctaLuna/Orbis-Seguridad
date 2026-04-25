"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosModule = void 0;
const common_1 = require("@nestjs/common");
const usuarios_service_1 = require("./services/usuarios.service");
const usuarios_controller_1 = require("./api/usuarios.controller");
const typeorm_1 = require("@nestjs/typeorm");
const usuario_entity_1 = require("./entities/usuario.entity");
const password_history_entity_1 = require("./entities/password-history.entity");
const investigador_empresa_entity_1 = require("./entities/investigador-empresa.entity");
const usuarios_auth_service_1 = require("./services/usuarios-auth.service");
const usuarios_task_service_1 = require("./tasks/usuarios-task.service");
const email_module_1 = require("../../shared/services/email/email.module");
const password_history_service_1 = require("./services/password-history.service");
let UsuariosModule = class UsuariosModule {
};
exports.UsuariosModule = UsuariosModule;
exports.UsuariosModule = UsuariosModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([usuario_entity_1.Usuario, password_history_entity_1.PasswordHistory, investigador_empresa_entity_1.InvestigadorEmpresa]),
            email_module_1.EmailModule,
        ],
        controllers: [usuarios_controller_1.UsuariosController],
        providers: [usuarios_service_1.UsuariosService, usuarios_auth_service_1.UsuariosAuthService, usuarios_task_service_1.UsuariosTaskService, password_history_service_1.PasswordHistoryService],
        exports: [usuarios_service_1.UsuariosService, usuarios_auth_service_1.UsuariosAuthService, password_history_service_1.PasswordHistoryService],
    })
], UsuariosModule);
//# sourceMappingURL=usuarios.module.js.map