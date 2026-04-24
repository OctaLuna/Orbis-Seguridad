import { Injectable } from '@nestjs/common';
import { CreateFundadoreDto } from '../dto/create-fundadore.dto';
import { UpdateFundadoreDto } from '../dto/update-fundadore.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Fundador } from '../entities/fundador.entity';
import { EntityManager, Repository } from 'typeorm';
import { DataSource } from 'typeorm/browser';

@Injectable()
export class FundadoresService {
	constructor(
		@InjectRepository(Fundador)
		private readonly fundadorRepository: Repository<Fundador>
	){}

	async createTransaction(maneger: EntityManager,data: CreateFundadoreDto) {
		let fundadores = data.fundadores.map((fundador) => ({
			idEmpresa: data.idEmpresa,
			nombre: fundador
		}))
		const repo = await maneger.getRepository(Fundador);
		const newFundadores = await repo.save(fundadores);
		return newFundadores;
	}

	findAll() {
		return `This action returns all fundadores`;
	}

	findOne(id: number) {
		return `This action returns a #${id} fundadore`;
	}

	update(id: number, updateFundadoreDto: UpdateFundadoreDto) {
		return `This action updates a #${id} fundadore`;
	}

	remove(id: number) {
		return `This action removes a #${id} fundadore`;
	}
}
