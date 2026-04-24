import { Injectable } from '@nestjs/common';
import { CreateMunicipioDto } from '../dto/create-municipio.dto';
import { UpdateMunicipioDto } from '../dto/update-municipio.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Municipio } from '../entities/municipio.entity';
import { In, Repository } from 'typeorm';
import { GetMunicipiosOptionsDto } from '../dto/get-municipios-options.dto';

@Injectable()
export class MunicipiosService {
    constructor(
        @InjectRepository(Municipio)
        private readonly muncipioRepository: Repository<Municipio>
    ){}

    create(createMunicipioDto: CreateMunicipioDto) {
        return 'This action adds a new municipio';
    }

    async findManybyIds(ids: number[]){
        const muncipios = await this.muncipioRepository.find({
            where: {
                id: In(ids)
            }
        });
        return muncipios;
    }

    async findAll(options?: GetMunicipiosOptionsDto) {
        const municipios = await this.muncipioRepository.find({
            ...(options ? {
                where: {
                    ...(options.filters ? {
                        ...(options.filters.departamentos ? {
                            idDepartamento: In(options.filters.departamentos)
                        }:{})
                    }:{})
                }
            }:{}),
            select: {
                id: true,
                nombreMunicipio: true,
                // --- CORRECCIÓN DEFINITIVA AQUÍ ---
                // Usamos el nombre de la propiedad en camelCase como está definido en la entidad de TypeORM.
                idDepartamento: true
            }
        })
        return municipios;
    }

    findOne(id: number) {
        return `This action returns a #${id} municipio`;
    }

    update(id: number, updateMunicipioDto: UpdateMunicipioDto) {
        return `This action updates a #${id} municipio`;
    }

    remove(id: number) {
        return `This action removes a #${id} municipio`;
    }
}
