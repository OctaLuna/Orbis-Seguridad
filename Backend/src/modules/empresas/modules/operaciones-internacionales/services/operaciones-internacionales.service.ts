import { Injectable } from '@nestjs/common';
import { CreateOperacionesInternacionaleDto } from '../dto/create-operaciones-internacionale.dto';
import { UpdateOperacionesInternacionaleDto } from '../dto/update-operaciones-internacionale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { OperacionInternacional } from '../entities/operacion-internacional.entity';
import { EntityManager, Repository } from 'typeorm';
import { PaisesService } from '../../paises/services/paises.service';

@Injectable()
export class OperacionesInternacionalesService {
	constructor(
		@InjectRepository(OperacionInternacional)
		private readonly operacionInternacionalRepository: Repository<OperacionInternacional>,
		private readonly paisesService: PaisesService
	){}

	create(createOperacionesInternacionaleDto: CreateOperacionesInternacionaleDto) {
		return 'This action adds a new operacionesInternacionale';
	}

	async createTransaction(manager: EntityManager,data: CreateOperacionesInternacionaleDto){
		await this.paisesService.findManyByIds(data.paisesOperaInternacionalmente);
		const paisesOperaInternacionalente = data.paisesOperaInternacionalmente.map(p => ({
			idEmpresa: data.idEmpresa,
			idPais: p
		}))
		return await manager.getRepository(OperacionInternacional).save(paisesOperaInternacionalente);
	}

	findAll() {
		return `This action returns all operacionesInternacionales`;
	}

	findOne(id: number) {
		return `This action returns a #${id} operacionesInternacionale`;
	}

	update(id: number, updateOperacionesInternacionaleDto: UpdateOperacionesInternacionaleDto) {
		return `This action updates a #${id} operacionesInternacionale`;
	}

	remove(id: number) {
		return `This action removes a #${id} operacionesInternacionale`;
	}
}
