import { Injectable } from '@nestjs/common';
import { CreateFamiliaDto } from '../dto/create-familia.dto';
import { UpdateFamiliaDto } from '../dto/update-familia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Familia } from '../entities/familia.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class FamiliasService {
	constructor(
		@InjectRepository(Familia)
		private readonly familiaRepository: Repository<Familia>
	){}

	create(createFamiliaDto: CreateFamiliaDto) {
		return 'This action adds a new familia';
	}

	async createTransaction(manager: EntityManager,data: CreateFamiliaDto){
		const familia = new Familia();
		familia.idEmpresa = data.idEmpresa;
		familia.esFamiliar = data.esFamiliar;
		familia.anio = data.anio;
		return await manager.getRepository(Familia).save(familia);
	}

	findAll() {
		return `This action returns all familias`;
	}

	findOne(id: number) {
		return `This action returns a #${id} familia`;
	}

	update(id: number, updateFamiliaDto: UpdateFamiliaDto) {
		return `This action updates a #${id} familia`;
	}

	remove(id: number) {
		return `This action removes a #${id} familia`;
	}
}
