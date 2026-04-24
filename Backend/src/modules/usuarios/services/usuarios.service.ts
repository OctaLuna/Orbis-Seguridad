import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from '../entities/usuario.entity';
import { DataSource, LessThanOrEqual, Repository } from 'typeorm';
import { OptionsFindOne } from 'src/common/classes';
import { RolesEnum } from 'src/shared/constants/roles.const';

@Injectable()
export class UsuariosService {
    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,
    ) { }
    create(createUsuarioDto: CreateUsuarioDto) {
        return 'This action adds a new usuario';
    }

    async findAll() {
        const usuario = await this.usuarioRepository.find({
            select: {
                id: true,
                usuario: true,
                correo: true,
                idRol: true,
                expiracion: true
            }
        });
        return usuario;
    }

    async findByUsuario(usuario: string, options?: OptionsFindOne) {

        const finalOptions = new OptionsFindOne();
        if (options) {
            Object.assign(finalOptions, options);
        }
        const repo = !finalOptions.manager ? this.usuarioRepository : finalOptions.manager!.getRepository(Usuario);
        const u = await repo.findOne({
            where: {
                usuario: usuario,
            },
        });
        if (!u && finalOptions.throwException) {
            throw new NotFoundException({
                message: 'Usuario no encontrado',
            });
        }
        return u;
    }

    async findOne(id: number, options?: OptionsFindOne) {
        const finalOptions = new OptionsFindOne();
        if (options) {
            Object.assign(finalOptions, options);
        }
        const repo = !finalOptions.manager ? this.usuarioRepository : finalOptions.manager!.getRepository(Usuario);
        const u = await repo.findOne({
            where: {
                id: id,
            },
        });
        if (!u) {
            if (finalOptions.throwException) {
                throw new NotFoundException({
                    message: 'Usuario no encontrado',
                });
            }
            return null;
        }
        if (
            u.idRol === RolesEnum.TEMPORAL &&
            u.expiracion &&
            u.expiracion.getTime() <= new Date().getTime()
        ) {
            if (finalOptions.throwException) {
                throw new NotFoundException({
                    message: 'Usuario no encontrado',
                });
            }
            return null;
        }
        return u;
    }

    async findOneByCorreo(correo: string, options?: OptionsFindOne) {
        const finalOptions = new OptionsFindOne();
        if (options) {
            Object.assign(finalOptions, options);
        }
        const repo = !finalOptions.manager ? this.usuarioRepository : finalOptions.manager!.getRepository(Usuario);
        const u = await repo.findOne({
            where: {
                correo: correo,
            },
        });
        if (!u) {
            if (finalOptions.throwException) {
                throw new NotFoundException({
                    message: 'Usuario no encontrado',
                });
            }
            return null;
        }
        if (
            u.idRol === RolesEnum.TEMPORAL &&
            u.expiracion &&
            u.expiracion.getTime() <= new Date().getTime()
        ) {
            if (finalOptions.throwException) {
                throw new NotFoundException({
                    message: 'Usuario no encontrado',
                });
            }
            return null;
        }
        return u;
    }
}
