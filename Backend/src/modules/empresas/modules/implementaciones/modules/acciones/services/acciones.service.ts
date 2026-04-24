import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAccioneDto } from '../dto/create-accione.dto';
import { UpdateAccioneDto } from '../dto/update-accione.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Accion } from '../entities/accion.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class AccionesService {
	constructor(
		@InjectRepository(Accion)
		private readonly accionRepository: Repository<Accion>
	){}

	create(createAccioneDto: CreateAccioneDto) {
		return 'This action adds a new accione';
	}

	async findManyByIds(ids: number[]) {
		const acciones = await this.accionRepository.find({
			where: {
				id: In(ids)
			}
		});
		const foundIds = acciones.map(a => a.id);
		const notFoundIds = ids.filter(id => !foundIds.includes(id));
		if (notFoundIds.length > 0) {
			throw new NotFoundException({
				message: `No se encontraron los siguientes ids: ${notFoundIds.join(', ')}`
			});
		}
		return acciones;
	}

	findAll() {
		return `This action returns all acciones`;
	}

	findOne(id: number) {
		return `This action returns a #${id} accione`;
	}

	update(id: number, updateAccioneDto: UpdateAccioneDto) {
		return `This action updates a #${id} accione`;
	}

	remove(id: number) {
		return `This action removes a #${id} accione`;
	}
}
