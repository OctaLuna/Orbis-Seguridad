import { Injectable } from '@nestjs/common';
import { CreateHitoDto } from '../dto/create-hito.dto';
import { UpdateHitoDto } from '../dto/update-hito.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Hito } from '../entities/hito.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class HitosService {
	constructor(
		@InjectRepository(Hito)
		private readonly hitoRepository: Repository<Hito>
	){}

	create(createHitoDto: CreateHitoDto) {
		return 'This action adds a new hito';
	}

	async createTransaction(manager:EntityManager,data: CreateHitoDto){
		const hitos = data.hitos.map(h => ({
			idEmpresa: data.idEmpresa,
			...h
		}))
		return await manager.getRepository(Hito).save(hitos);
	}

	findAll() {
		return `This action returns all hitos`;
	}

	findOne(id: number) {
		return `This action returns a #${id} hito`;
	}

	update(id: number, updateHitoDto: UpdateHitoDto) {
		return `This action updates a #${id} hito`;
	}

	remove(id: number) {
		return `This action removes a #${id} hito`;
	}
}
