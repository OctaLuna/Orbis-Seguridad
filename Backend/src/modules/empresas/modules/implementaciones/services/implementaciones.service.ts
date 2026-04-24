import { Injectable } from '@nestjs/common';
import { CreateImplementacioneDto } from '../dto/create-implementacione.dto';
import { UpdateImplementacioneDto } from '../dto/update-implementacione.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Implementacion } from '../entities/implementacion.entity';
import { EntityManager, Repository } from 'typeorm';
import { TiposAccionesImplementacionesService } from '../modules/tipos-acciones/modules/tipos-acciones-implementaciones/services/tipos-acciones-implementaciones.service';
import { ImplementacionesAccionesService } from '../modules/acciones/modules/implementaciones-acciones/services/implementaciones-acciones.service';

@Injectable()
export class ImplementacionesService {
    constructor(
        @InjectRepository(Implementacion)
        private readonly implementacionRepository: Repository<Implementacion>,
        private readonly tiposAccionesImplementacionesService: TiposAccionesImplementacionesService,
        private readonly implementacionesAccionesService: ImplementacionesAccionesService
    ){}

    create(data: CreateImplementacioneDto) {
        return 'This action adds a new implementacione';
    }

    async createTransaction(manager:EntityManager, data: CreateImplementacioneDto){
        const implementacion = new Implementacion();
        implementacion.anio = data.anio || new Date().getFullYear();
        implementacion.idEmpresa = data.idEmpresa;
        const implementacionSaved = await manager.getRepository(Implementacion).save(implementacion);

        // Solo ejecutar si el array 'tiposAccion' existe y no está vacío
        if (data.tiposAccion && data.tiposAccion.length > 0) {
            await this.tiposAccionesImplementacionesService.createTransaction(manager,{
                idImplementacion: implementacionSaved.id,
                tiposAcciones: data.tiposAccion
            });
        }
        
        // Solo ejecutar si el array 'acciones' existe y no está vacío
        if (data.acciones && data.acciones.length > 0) {
            await this.implementacionesAccionesService.createTransaction(manager,{
                idImplementacion: implementacionSaved.id,
                acciones: data.acciones
            });
        }
        
        return implementacionSaved;
    }

    findAll() {
        return `This action returns all implementaciones`;
    }

    findOne(id: number) {
        return `This action returns a #${id} implementacione`;
    }

    update(id: number, updateImplementacioneDto: UpdateImplementacioneDto) {
        return `This action updates a #${id} implementacione`;
    }

    remove(id: number) {
        return `This action removes a #${id} implementacione`;
    }
}
