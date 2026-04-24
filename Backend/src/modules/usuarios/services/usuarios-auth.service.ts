import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from '../entities/usuario.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { hashPassword } from 'src/common/utils';
import { CreateUsuarioTemporalDto } from '../dto/create-usuario-temporal.dto';
import { RolesEnum } from 'src/shared/constants/roles.const';
import { UsuariosService } from './usuarios.service';

@Injectable()
export class UsuariosAuthService {
	constructor(
		@InjectRepository(Usuario)
		private readonly usuarioRepository: Repository<Usuario>,
		private readonly usuariosService: UsuariosService
	) { }

	private sanitize(u: Usuario) {
		if (!u) return u as any;
		const { contrasenia, ...rest } = u as any;
		return rest;
	}

	async create(data: CreateUsuarioDto) {
		const usuario = new Usuario();
		usuario.correo = data.correo;
		usuario.usuario = data.usuario;
		usuario.contrasenia = await hashPassword(data.contrasenia);
		usuario.idRol = data.idRol;
		const usuarioSaved = await this.usuarioRepository.save(usuario);
		return usuarioSaved;
	}
	async createTemporal(data: CreateUsuarioTemporalDto, manager?: EntityManager) {
		const repo = manager ? manager.getRepository(Usuario) : this.usuarioRepository;
		const usuario = new Usuario();
		usuario.usuario = data.usuario;
		usuario.correo = data.correo;
		usuario.contrasenia = await hashPassword(data.contrasenia);
		usuario.idRol = RolesEnum.TEMPORAL;
		usuario.expiracion = data.expiracion;
		const usuarioSaved = await repo.save(usuario);
		return usuarioSaved;
	}

	async update(id: number, data: UpdateUsuarioDto) {
		const entity = await this.usuariosService.findOne(id, {
			throwException: true,
		});

		if (data.usuario && data.usuario !== entity!.usuario) {
			const repeated = await this.usuariosService.findByUsuario(data.usuario, {
				throwException: false,
			});

			if (repeated && repeated.id !== id) {
				throw new ConflictException({
					message: 'El nombre de usuario ya está en uso.',
				});
			}

			entity!.usuario = data.usuario;
		}

		if (data.contrasenia) {
			entity!.contrasenia = await hashPassword(data.contrasenia);
		}

		if (data.correo && data.correo !== entity!.correo) {
			const repeatedEmail = await this.usuariosService.findOneByCorreo(data.correo, {
				throwException: false,
			});

			if (repeatedEmail && repeatedEmail.id !== id) {
				throw new ConflictException({
					message: 'El correo ya está en uso.',
				});
			}

			entity!.correo = data.correo;
		}

		if (data.idRol !== undefined && data.idRol !== entity!.idRol) {
			entity!.idRol = data.idRol;
		}

		const updated = await this.usuarioRepository.save(entity!);
		return this.sanitize(updated);
	}


	async remove(id: number) {
		const exists = await this.usuariosService.findOne(id, {
			throwException: true
		});
		await this.usuarioRepository.delete(id);
		return true;
	}
}
