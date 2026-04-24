import { Module } from '@nestjs/common';
import { UsuariosService } from './services/usuarios.service';
import { UsuariosController } from './api/usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { UsuariosAuthService } from './services/usuarios-auth.service';
import { ScheduleModule } from '@nestjs/schedule';
import { UsuariosTaskService } from './tasks/usuarios-task.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Usuario]),
    ],
    controllers: [UsuariosController],
    providers: [UsuariosService, UsuariosAuthService,UsuariosTaskService],
    exports: [UsuariosService, UsuariosAuthService],
})
export class UsuariosModule {}
