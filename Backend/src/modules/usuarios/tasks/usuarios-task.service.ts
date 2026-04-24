import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Usuario } from "../entities/usuario.entity";
import { LessThanOrEqual, Repository } from "typeorm";
import { Cron, CronExpression } from "@nestjs/schedule";
import { RolesEnum } from "src/shared/constants/roles.const";

@Injectable()
export class UsuariosTaskService {
    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>
    ){}

    @Cron(CronExpression.EVERY_DAY_AT_3AM,{
        name: 'eliminar-expirados',
        timeZone: 'America/La_Paz'
    })
    async eliminarUsuarioExpirados(){
        const usuarios = await this.usuarioRepository.find({
            where: {
                idRol: RolesEnum.TEMPORAL,
                expiracion: LessThanOrEqual(new Date())
            }
        })
        if (usuarios && usuarios.length > 0){
            await this.usuarioRepository.remove(usuarios);
        }
    }
}