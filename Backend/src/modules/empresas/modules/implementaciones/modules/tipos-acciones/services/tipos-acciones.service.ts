import { Injectable } from '@nestjs/common';
import { CreateTiposAccioneDto } from '../dto/create-tipos-accione.dto';
import { UpdateTiposAccioneDto } from '../dto/update-tipos-accione.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoAccion } from '../entities/tipo-accion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TiposAccionesService {
	constructor(
		@InjectRepository(TipoAccion)
		private readonly tipoAccionRepository: Repository<TipoAccion>
	){}

	create(createTiposAccioneDto: CreateTiposAccioneDto) {
		return 'This action adds a new tiposAccione';
	}

	findAll() {
		return `This action returns all tiposAcciones`;
	}

	findOne(id: number) {
		return `This action returns a #${id} tiposAccione`;
	}

	update(id: number, updateTiposAccioneDto: UpdateTiposAccioneDto) {
		return `This action updates a #${id} tiposAccione`;
	}

	remove(id: number) {
		return `This action removes a #${id} tiposAccione`;
	}
}
