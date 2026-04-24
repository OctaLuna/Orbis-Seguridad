import { Injectable } from '@nestjs/common';
import { CreateImplementacionesAccioneDto } from '../dto/create-implementaciones-accione.dto';
import { UpdateImplementacionesAccioneDto } from '../dto/update-implementaciones-accione.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ImplementacionAccion } from '../entities/implementacion-accion.entity';
import { EntityManager, Repository } from 'typeorm';
import { AccionesService } from '../../../services/acciones.service';
import { ProyectosService } from '../../proyectos/services/proyectos.service';

@Injectable()
export class ImplementacionesAccionesService {
	constructor(
		@InjectRepository(ImplementacionAccion)
		private readonly implementacionAccionRepository: Repository<ImplementacionAccion>,
		private readonly accionesService: AccionesService,
		private readonly proyectosService: ProyectosService
	) { }

	create(createImplementacionesAccioneDto: CreateImplementacionesAccioneDto) {
		return 'This action adds a new implementacionesAccione';
	}

	async createTransaction(manager: EntityManager, data: CreateImplementacionesAccioneDto) {
		await this.accionesService.findManyByIds(data.acciones.map(a => a.id));

		const accionesSaved: ImplementacionAccion[] = [];

		for (const accion of data.acciones) {
			const implementacionAccionSaved = await this.saveImplementacionAccion(manager, data, accion);

			await this.proyectosService.createTransaction(manager, {
				idImplementacionAccion: implementacionAccionSaved.id,
				proyectos: accion.proyectos
			});

			accionesSaved.push(implementacionAccionSaved);
		}

		return accionesSaved;
	}

	private async saveImplementacionAccion(
		manager: EntityManager,
		data: CreateImplementacionesAccioneDto,
		accion: { id: number; proyectos: any[] }
	) {
		return manager.getRepository(ImplementacionAccion).save({
			idImplementacion: data.idImplementacion,
			idAccion: accion.id
		});
	}

	findAll() {
		return `This action returns all implementacionesAcciones`;
	}

	findOne(id: number) {
		return `This action returns a #${id} implementacionesAccione`;
	}

	update(id: number, updateImplementacionesAccioneDto: UpdateImplementacionesAccioneDto) {
		return `This action updates a #${id} implementacionesAccione`;
	}

	remove(id: number) {
		return `This action removes a #${id} implementacionesAccione`;
	}
}
