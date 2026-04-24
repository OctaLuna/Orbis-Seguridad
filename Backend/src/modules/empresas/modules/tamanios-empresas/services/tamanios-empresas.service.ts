import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTamaniosEmpresaDto } from '../dto/create-tamanios-empresa.dto';
import { UpdateTamaniosEmpresaDto } from '../dto/update-tamanios-empresa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TamanioEmpresa } from '../entities/tamanio-empresa.entity';
import { Repository } from 'typeorm';
import { OptionsFindOne } from 'src/common/classes';

@Injectable()
export class TamaniosEmpresasService {
	constructor(
		@InjectRepository(TamanioEmpresa)
		private readonly tamanioEmpresaRepository: Repository<TamanioEmpresa>
	){}

	create(createTamaniosEmpresaDto: CreateTamaniosEmpresaDto) {
		return 'This action adds a new tamaniosEmpresa';
	}

	async findAll() {
		const tama = await this.tamanioEmpresaRepository.find({
			select: {
				id: true,
				nombre: true
			}
		})
		return tama;
	}

	async findOne(id: number,options: OptionsFindOne = {}) {
		if (Number.isNaN(id) || id === 0){
			throw new BadRequestException({
				message: 'Id de tamanio de empresa invalido'
			})
		}
		const tamanio = await this.tamanioEmpresaRepository.findOne({
			where: {
				id: id
			}
		})
		if (!tamanio && options.throwException){
			throw new NotFoundException({
				message: 'No se encontro el tamanio de la empresa'
			})
		}
		return tamanio;
	}

	update(id: number, updateTamaniosEmpresaDto: UpdateTamaniosEmpresaDto) {
		return `This action updates a #${id} tamaniosEmpresa`;
	}

	remove(id: number) {
		return `This action removes a #${id} tamaniosEmpresa`;
	}
}
