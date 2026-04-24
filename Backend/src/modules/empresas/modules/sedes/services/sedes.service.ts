import { Injectable } from '@nestjs/common';
import { CreateSedeDto } from '../dto/create-sede.dto';
import { UpdateSedeDto } from '../dto/update-sede.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sede } from '../entities/sede.entity';
import { EntityManager, Repository } from 'typeorm';
import { DepartamentosService } from '../../departamentos/services/departamentos.service';

@Injectable()
export class SedesService {
	constructor(
		@InjectRepository(Sede)
		private readonly sedeRepository: Repository<Sede>,
		private readonly departamentosService: DepartamentosService
	){}

	create(createSedeDto: CreateSedeDto) {
		return 'This action adds a new sede';
	}

	async createTransaction(manager: EntityManager,data: CreateSedeDto){
		await this.departamentosService.findManyByIds(data.sedes.map(s => s.idDepartamento));
		const sedes: {idEmpresa: number,idDepartamento: number,esCentral: boolean}[] = data.sedes.map(s => ({
			idEmpresa: data.idEmpresa,
			idDepartamento: s.idDepartamento,
			esCentral: s.esCentral
		}));
		return await manager.getRepository(Sede).save(sedes);
	}

	findAll() {
		return `This action returns all sedes`;
	}

	findOne(id: number) {
		return `This action returns a #${id} sede`;
	}

	update(id: number, updateSedeDto: UpdateSedeDto) {
		return `This action updates a #${id} sede`;
	}

	remove(id: number) {
		return `This action removes a #${id} sede`;
	}
}
