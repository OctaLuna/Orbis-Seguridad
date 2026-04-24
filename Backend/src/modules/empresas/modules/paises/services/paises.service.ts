import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaiseDto } from '../dto/create-paise.dto';
import { UpdatePaiseDto } from '../dto/update-paise.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pais } from '../entities/pais.entity';
import { In, Like, Repository } from 'typeorm';

@Injectable()
export class PaisesService {
	constructor(
		@InjectRepository(Pais)
		private readonly paisRepository: Repository<Pais>
	){}

	create(createPaiseDto: CreatePaiseDto) {
		return 'This action adds a new paise';
	}

	async findManyByIds(ids: number[]) {
		const paises = await this.paisRepository.find({
			where: {
				id: In(ids)
			}
		});

		const foundIds = paises.map(pais => pais.id);
		const notFoundIds = ids.filter(id => !foundIds.includes(id));

		if (notFoundIds.length > 0) {
			throw new NotFoundException({
				message: `No se encontraron los siguientes ids: ${notFoundIds.join(', ')}`
			});
		}
		return paises;
	}

	async findAll() {
		const paises = await this.paisRepository.find({
			select: {
				id: true,
				nombre: true
			}
		})
		return paises;
	}

	findOne(id: number) {
		return `This action returns a #${id} paise`;
	}

	update(id: number, updatePaiseDto: UpdatePaiseDto) {
		return `This action updates a #${id} paise`;
	}

	remove(id: number) {
		return `This action removes a #${id} paise`;
	}
}
