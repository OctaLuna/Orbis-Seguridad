import { Injectable } from '@nestjs/common';
import { CreateRubrosEmpresaDto } from '../dto/create-rubros-empresa.dto';
import { UpdateRubrosEmpresaDto } from '../dto/update-rubros-empresa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RubroEmpresa } from '../entities/rubro-empresa.entity';
import { EntityManager, Repository } from 'typeorm';
import { RubrosService } from '../../../services/rubros.service';

@Injectable()
export class RubrosEmpresasService {
    constructor(
        @InjectRepository(RubroEmpresa)
        private readonly rubroEmpresaRepository: Repository<RubroEmpresa>,
        private readonly rubrosService: RubrosService
    ){}

    create(createRubrosEmpresaDto: CreateRubrosEmpresaDto) {
        return 'This action adds a new rubrosEmpresa';
    }

    // --- FUNCIÓN CORREGIDA ---
    async createTransaction(manager: EntityManager, data: CreateRubrosEmpresaDto & { idEmpresa: number }){
        // Verificamos si la propiedad 'data' existe y no está vacía antes de usarla
        if (data.data && data.data.length > 0) {
            await this.rubrosService.findManyByIds(data.data.map(d => d.idRubro));
        }

        // Verificamos si la propiedad 'otros' existe y no está vacía
        const rubrosOtro = (data.otros && data.otros.length > 0)
            ? await this.rubrosService.createTransaccion(manager, data.otros)
            : [];

        let rubrosEmpresa: {idEmpresa: number, idRubro: number, esActivo: boolean}[] = [];
        
        // Usamos optional chaining (?.) para evitar errores si 'data.data' es undefined
        data.data?.map(d => {
            rubrosEmpresa.push({
                idEmpresa: data.idEmpresa,
                idRubro: d.idRubro,
                esActivo: d.esActivo
            })
        })

        rubrosOtro.map(o => {
            rubrosEmpresa.push({
                idEmpresa: data.idEmpresa,
                idRubro: o.idRubro, // Asumiendo que createTransaccion devuelve un objeto con idRubro
                esActivo: o.esActivo
            })
        })
        
        // Solo guardamos si hay algo que guardar para evitar errores
        if (rubrosEmpresa.length > 0) {
            return await manager.getRepository(RubroEmpresa).save(rubrosEmpresa);
        }

        return []; // Devolvemos un array vacío si no se creó nada
    }

    findAll() {
        return `This action returns all rubrosEmpresas`;
    }

    findOne(id: number) {
        return `This action returns a #${id} rubrosEmpresa`;
    }

    update(id: number, updateRubrosEmpresaDto: UpdateRubrosEmpresaDto) {
        return `This action updates a #${id} rubrosEmpresa`;
    }

    remove(id: number) {
        return `This action removes a #${id} rubrosEmpresa`;
    }
}
