import { Module } from "@nestjs/common";
import { SolicitudesTemporalesService } from "./services/solicitudes-temporales.service";
import { SolicitudesTemporalesController } from "./api/solicitudes-temporales.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SolicitudTemporal } from "./entities/solicitud-temporal.entity";
import { EmailModule } from "src/shared/services/email/email.module";
import { UsuariosModule } from "src/modules/usuarios/usuarios.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([SolicitudTemporal]),
        EmailModule,
        UsuariosModule
    ],    
    providers: [SolicitudesTemporalesService],
    controllers: [SolicitudesTemporalesController],
    exports: [SolicitudesTemporalesService]
})
export class SolicitudesTemporalesModule {}
