import { Module } from '@nestjs/common';
import { UsuariosService } from './services/usuarios.service';
import { UsuariosController } from './api/usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { PasswordHistory } from './entities/password-history.entity';
import { InvestigadorEmpresa } from './entities/investigador-empresa.entity';
import { UsuariosAuthService } from './services/usuarios-auth.service';
import { UsuariosTaskService } from './tasks/usuarios-task.service';
import { EmailModule } from 'src/shared/services/email/email.module';
import { PasswordHistoryService } from './services/password-history.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Usuario, PasswordHistory, InvestigadorEmpresa]),
        EmailModule,
    ],
    controllers: [UsuariosController],
    providers: [UsuariosService, UsuariosAuthService, UsuariosTaskService, PasswordHistoryService],
    exports: [UsuariosService, UsuariosAuthService, PasswordHistoryService],
})
export class UsuariosModule {}
