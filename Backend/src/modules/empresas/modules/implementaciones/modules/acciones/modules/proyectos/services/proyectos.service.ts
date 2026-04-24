import { Injectable } from '@nestjs/common';
import { CreateProyectoDto } from '../dto/create-proyecto.dto';
import { UpdateProyectoDto } from '../dto/update-proyecto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Proyecto } from '../entities/proyecto.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class ProyectosService {
	constructor(
		@InjectRepository(Proyecto)
		private readonly proyectosRepository: Repository<Proyecto>
	){}

	create(createProyectoDto: CreateProyectoDto) {
		return 'This action adds a new proyecto';
	}

	async createTransaction(manager: EntityManager,data: CreateProyectoDto){
		const proyectos = data.proyectos.map(p => ({
			idImplementacionAccion: data.idImplementacionAccion,
			nombre: p
		}))
		return await manager.getRepository(Proyecto).save(proyectos);
	}

	findAll() {
		return `This action returns all proyectos`;
	}

	findOne(id: number) {
		return `This action returns a #${id} proyecto`;
	}

	update(id: number, updateProyectoDto: UpdateProyectoDto) {
		return `This action updates a #${id} proyecto`;
	}

	remove(id: number) {
		return `This action removes a #${id} proyecto`;
	}
}
