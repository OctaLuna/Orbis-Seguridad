import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRubroDto } from '../dto/create-rubro.dto';
import { UpdateRubroDto } from '../dto/update-rubro.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rubro } from '../entities/rubro.entity';
import { EntityManager, In, Repository } from 'typeorm';

@Injectable()
export class RubrosService {
	constructor(
		@InjectRepository(Rubro)
		private readonly rubroRepository: Repository<Rubro>
	) { }

	create(createRubroDto: CreateRubroDto) {
		return 'This action adds a new rubro';
	}

	async createTransaccion(manager: EntityManager, data: CreateRubroDto[]) {
		const rubros = data.map((rubro) => ({
			nombre: rubro.nombre,
			esPropio: true
		}))
		const result: Rubro[] = await manager.getRepository(Rubro).save(rubros)
		return result.map((r) => ({
			idRubro: r.id,
			esActivo: data.find(ru => ru.nombre === r.nombre)!.esActivo
		}));
	}

	async findManyByIds(ids: number[]) {
		const rubros = await this.rubroRepository.find({
			where: {
				id: In(ids)
			}
		})
		const foundIds = rubros.map(r => r.id);
		const missingId = ids.find(id => !foundIds.includes(id));
		if (missingId !== undefined) {
			throw new NotFoundException(`El rubro con id ${missingId} no fue encontrado`);
		}
		return rubros;
	}

	async findAll() {
		const rubros = await this.rubroRepository.find({
			where: {
				esPropio: false
			},
			select: {
				id: true,
				nombre: true
			}
		});
		return rubros;
	}

	findOne(id: number) {
		return `This action returns a #${id} rubro`;
	}

	update(id: number, updateRubroDto: UpdateRubroDto) {
		return `This action updates a #${id} rubro`;
	}

	remove(id: number) {
		return `This action removes a #${id} rubro`;
	}
}
