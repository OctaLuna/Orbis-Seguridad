import { Injectable } from '@nestjs/common';
import { CreateServicioDto } from '../dto/create-servicio.dto';
import { UpdateServicioDto } from '../dto/update-servicio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Servicio } from '../entities/servicio.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class ServiciosService {
	constructor(
		@InjectRepository(Servicio)
		private readonly servicioRepository: Repository<Servicio>
	){}

	create(createServicioDto: CreateServicioDto) {
		return 'This action adds a new servicio';
	}

	async createTransaction(manger: EntityManager,data: CreateServicioDto){
		const repo = manger.getRepository(Servicio);
		const servicios = data.servicio.map((servicio) => ({
			idEmpresa: data.idEmpresa,
			nombre: servicio
		}))
		return await repo.save(servicios);
	}

	findAll() {
		return `This action returns all servicios`;
	}

	findOne(id: number) {
		return `This action returns a #${id} servicio`;
	}

	update(id: number, updateServicioDto: UpdateServicioDto) {
		return `This action updates a #${id} servicio`;
	}

	remove(id: number) {
		return `This action removes a #${id} servicio`;
	}
}
