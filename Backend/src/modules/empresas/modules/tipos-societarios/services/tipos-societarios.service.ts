import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTiposSocietarioDto } from '../dto/create-tipos-societario.dto';
import { UpdateTiposSocietarioDto } from '../dto/update-tipos-societario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoSocietario } from '../entities/tipo-societario.entity';
import { EntityManager, In, Repository } from 'typeorm';

@Injectable()
export class TiposSocietariosService {
	constructor(
		@InjectRepository(TipoSocietario)
		private readonly tipoSocietarioRepository: Repository<TipoSocietario>
	) { }

	create(createTiposSocietarioDto: CreateTiposSocietarioDto) {
		return 'This action adds a new tiposSocietario';
	}

	async createTransaccion(manager: EntityManager, data: CreateTiposSocietarioDto[]) {
		console.log(data)
		const tiposSocietarios = data.map((tipoSoc) => ({
			nombre: tipoSoc.nombre,
			esPropio: true
		}))
		const result: TipoSocietario[] = await manager.getRepository(TipoSocietario).save(tiposSocietarios)
		return result.map((tp) => ({
			idTipsoc: tp.id,
			esActivo: data.find(t => t.nombre === tp.nombre)!.esActivo,
			fechaCambio: data.find(ti => ti.nombre === tp.nombre)!.fechaCambio
		}));
	}

	async findManyByIds(ids: number[]) {
		const rubros = await this.tipoSocietarioRepository.find({
			where: {
				id: In(ids)
			}
		})
		const foundIds = rubros.map(r => r.id);
		const missingId = ids.find(id => !foundIds.includes(id));
		if (missingId !== undefined) {
			throw new NotFoundException(`El tipo de societario con id ${missingId} no fue encontrado`);
		}
		return rubros;
	}

	async findAll() {
		const tiposSocietarios = await this.tipoSocietarioRepository.find({
			where: {
				esPropio: false
			},
			select: {
				id: true,
				nombre: true,
			}
		});
		return tiposSocietarios;
	}

	findOne(id: number) {
		return `This action returns a #${id} tiposSocietario`;
	}

	update(id: number, updateTiposSocietarioDto: UpdateTiposSocietarioDto) {
		return `This action updates a #${id} tiposSocietario`;
	}

	remove(id: number) {
		return `This action removes a #${id} tiposSocietario`;
	}
}
