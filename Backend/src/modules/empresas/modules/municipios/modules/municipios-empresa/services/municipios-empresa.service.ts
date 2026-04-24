import { Injectable } from '@nestjs/common';
import { CreateMunicipiosEmpresaDto } from '../dto/create-municipios-empresa.dto';
import { UpdateMunicipiosEmpresaDto } from '../dto/update-municipios-empresa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MunicipioEmpresa } from '../entities/municipio-empresa.entity';
import { EntityManager, Repository } from 'typeorm';
import { MunicipiosService } from '../../../services/municipios.service';

@Injectable()
export class MunicipiosEmpresaService {
	constructor(
		@InjectRepository(MunicipioEmpresa)
		private readonly municipioEmpresaRepository: Repository<MunicipioEmpresa>,
		private readonly municipiosService: MunicipiosService
	){}

	create(createMunicipiosEmpresaDto: CreateMunicipiosEmpresaDto) {
		return 'This action adds a new municipiosEmpresa';
	}

	async createTransaction(manager: EntityManager,data: CreateMunicipiosEmpresaDto){
		await this.municipiosService.findManybyIds(data.municipios);
		const muncipios: {idEmpresa: number,idMunicipio: number}[] = data.municipios.map(m => ({
			idEmpresa: data.idEmpresa,
			idMunicipio: m
		}));
		return await manager.getRepository(MunicipioEmpresa).save(muncipios);
	}

	findAll() {
		return `This action returns all municipiosEmpresa`;
	}

	findOne(id: number) {
		return `This action returns a #${id} municipiosEmpresa`;
	}

	update(id: number, updateMunicipiosEmpresaDto: UpdateMunicipiosEmpresaDto) {
		return `This action updates a #${id} municipiosEmpresa`;
	}

	remove(id: number) {
		return `This action removes a #${id} municipiosEmpresa`;
	}
}
