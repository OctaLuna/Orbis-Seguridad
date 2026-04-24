import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDepartamentoDto } from '../dto/create-departamento.dto';
import { UpdateDepartamentoDto } from '../dto/update-departamento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Departamento } from '../entities/departamento.entity';
import { In, Repository } from 'typeorm';
import { OptionsFindOne } from 'src/common/classes';

@Injectable()
export class DepartamentosService {
	constructor(
		@InjectRepository(Departamento)
		private readonly departamentoRepository: Repository<Departamento>
	) { }
	create(createDepartamentoDto: CreateDepartamentoDto) {
		return 'This action adds a new departamento';
	}

	async findAll() {
		const departamentos = await this.departamentoRepository.find({
			select: {
				id: true,
				nombre: true
			}
		})
		return departamentos;
	}

	async findManyByIds(ids: number[]) {
		const departamentos = await this.departamentoRepository.find({
			where: {
				id: In(ids)
			}
		});

		const encontradosIds = departamentos.map(dep => dep.id);
		const idsNoEncontrados = ids.filter(id => !encontradosIds.includes(id));

		if (idsNoEncontrados.length > 0) {
			throw new NotFoundException({
				message: 'Algunos IDs de departamentos no se encontraron',
			});
		}

		return departamentos;
	}

	async findOne(id: number,options: OptionsFindOne = {}) {
		if (Number.isNaN(id) || id === 0) {
			throw new BadRequestException({
				message: 'Id de tamanio de empresa invalido'
			})
		}
		const dep = await this.departamentoRepository.findOne({
			where: {
				id: id
			}
		})
		if (!dep && options.throwException) {
			throw new NotFoundException({
				message: 'No se encontro el tamanio de la empresa'
			})
		}
		return dep;
	}

	update(id: number, updateDepartamentoDto: UpdateDepartamentoDto) {
		return `This action updates a #${id} departamento`;
	}

	remove(id: number) {
		return `This action removes a #${id} departamento`;
	}
}
