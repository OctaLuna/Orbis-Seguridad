import { Injectable } from '@nestjs/common';
import { CreateImageneDto } from '../dto/create-imagene.dto';
import { UpdateImageneDto } from '../dto/update-imagene.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Imagen } from '../entities/imagen.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class ImagenesService {
	constructor(
		@InjectRepository(Imagen)
		private readonly imagenRepository: Repository<Imagen>
	){}

	create(createImageneDto: CreateImageneDto) {
		return 'This action adds a new imagene';
	}

	async createTransaction(manger: EntityManager,data: CreateImageneDto){
		const repo = manger.getRepository(Imagen);
		const imagenes = data.imagenes.map((imagen) => ({
			idEmpresa: data.idEmpresa,
			url: imagen
		}))
		return await repo.save(imagenes);
	}

	findAll() {
		return `This action returns all imagenes`;
	}

	findOne(id: number) {
		return `This action returns a #${id} imagene`;
	}

	update(id: number, updateImageneDto: UpdateImageneDto) {
		return `This action updates a #${id} imagene`;
	}

	remove(id: number) {
		return `This action removes a #${id} imagene`;
	}
	//Nuevo método para obtener imágenes por idEmpresa
	async getByEmpresaId(idEmpresa: number) {
    const imagenes = await this.imagenRepository.find({
      where: { idEmpresa },
    });

    if (!imagenes || imagenes.length === 0) {
      return { mensaje: `No se encontraron imágenes para la empresa con id ${idEmpresa}` };
    }

    return imagenes;
  }
}
