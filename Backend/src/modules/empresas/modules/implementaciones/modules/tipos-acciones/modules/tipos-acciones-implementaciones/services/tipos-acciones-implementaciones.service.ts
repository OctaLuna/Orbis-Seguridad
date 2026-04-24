import { Injectable } from '@nestjs/common';
import { CreateTiposAccionesImplementacioneDto } from '../dto/create-tipos-acciones-implementacione.dto';
import { UpdateTiposAccionesImplementacioneDto } from '../dto/update-tipos-acciones-implementacione.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoAccionImplementacion } from '../entities/tipo-accion-implementacion.entity';
import { EntityManager, Repository } from 'typeorm';
import { TiposAccionesService } from '../../../services/tipos-acciones.service';

@Injectable()
export class TiposAccionesImplementacionesService {
    constructor(
        @InjectRepository(TipoAccionImplementacion)
        private readonly tipoAccionImplementacionRepository: Repository<TipoAccionImplementacion>,
        private readonly tiposAccionesService: TiposAccionesService
    ){}

    create(createTiposAccionesImplementacioneDto: CreateTiposAccionesImplementacioneDto) {
        return 'This action adds a new tiposAccionesImplementacione';
    }

    async createTransaction(manager: EntityManager,data: CreateTiposAccionesImplementacioneDto){
        // Verificamos que el array exista y no esté vacío antes de mapear
        if (!data.tiposAcciones || data.tiposAcciones.length === 0) {
            return []; // No hay nada que hacer, devolvemos un resultado vacío
        }

        const tiposAccionesImplementaciones = data.tiposAcciones.map(t => ({
            idImplementacion: data.idImplementacion,
            idTipoAccion: t
        }))
        return await manager.getRepository(TipoAccionImplementacion).save(tiposAccionesImplementaciones)
    }

    findAll() {
        return `This action returns all tiposAccionesImplementaciones`;
    }

    findOne(id: number) {
        return `This action returns a #${id} tiposAccionesImplementacione`;
    }

    update(id: number, updateTiposAccionesImplementacioneDto: UpdateTiposAccionesImplementacioneDto) {
        return `This action updates a #${id} tiposAccionesImplementacione`;
    }

    remove(id: number) {
        return `This action removes a #${id} tiposAccionesImplementacione`;
    }
}
