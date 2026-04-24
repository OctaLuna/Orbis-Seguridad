import { Injectable } from '@nestjs/common';
import { CreatePremioDto } from '../dto/create-premio.dto';
import { UpdatePremioDto } from '../dto/update-premio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Premio } from '../entities/premio.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class PremiosService {
	constructor(
		@InjectRepository(Premio)
		private readonly premioRepository: Repository<Premio>
	){}

	create(createPremioDto: CreatePremioDto) {
		return 'This action adds a new premio';
	}

	async createTransaction(manager: EntityManager,data: CreatePremioDto){
		const reconocimientos: {idEmpresa: number,nombre: string,esPremio: boolean,esNacional: boolean,anio: number}[] = data.reconocimientos.map(r => ({
			idEmpresa: data.idEmpresa,
			nombre: r.nombre,
			esPremio: r.esPremio,
			esNacional: r.esNacional,
			anio: r.anio
		}));
		return await manager.getRepository(Premio).save(reconocimientos);
	}

	findAll() {
		return `This action returns all premios`;
	}

	findOne(id: number) {
		return `This action returns a #${id} premio`;
	}

	update(id: number, updatePremioDto: UpdatePremioDto) {
		return `This action updates a #${id} premio`;
	}

	remove(id: number) {
		return `This action removes a #${id} premio`;
	}
}
