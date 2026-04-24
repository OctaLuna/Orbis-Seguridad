import { Injectable } from '@nestjs/common';
import { CreateEmpresasTiposSocietarioDto } from '../dto/create-empresas-tipos-societario.dto';
import { UpdateEmpresasTiposSocietarioDto } from '../dto/update-empresas-tipos-societario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EmpresaTipoSocietario } from '../entities/empresa-tipo-societario.entity';
import { EntityManager, Repository } from 'typeorm';
import { TiposSocietariosService } from '../../../services/tipos-societarios.service';

@Injectable()
export class EmpresasTiposSocietariosService {
    constructor(
        @InjectRepository(EmpresaTipoSocietario)
        private readonly empresaTipoSocietario: Repository<EmpresaTipoSocietario>,
        private readonly tiposSocietariosService: TiposSocietariosService
    ) { }

    create(createEmpresasTiposSocietarioDto: CreateEmpresasTiposSocietarioDto) {
        return 'This action adds a new empresasTiposSocietario';
    }

    async createTransaction(manager: EntityManager, data: CreateEmpresasTiposSocietarioDto & { idEmpresa: number }) {
        // Verificamos si la propiedad 'data' existe y es un array no vacío
        if (data.data && Array.isArray(data.data) && data.data.length > 0) {
            // CORRECCIÓN 1: Usamos la propiedad correcta 'idTipoSocietario' del DTO.
            await this.tiposSocietariosService.findManyByIds(data.data.map(d => d.idTipoSocietario));
        }

        // Verificamos si la propiedad 'otros' existe y es un array no vacío
        const tipoSocOtros = (data.otros && Array.isArray(data.otros) && data.otros.length > 0)
            ? await this.tiposSocietariosService.createTransaccion(manager, data.otros)
            : [];

        const tiposSocParaGuardar: { idEmpresa: number, idTipsoc: number, esActivo: boolean, fechaCambio?: string }[] = [];

        // Mapeamos los tipos societarios existentes si existen
        if (data.data) {
            for (const d of data.data) {
                tiposSocParaGuardar.push({
                    idEmpresa: data.idEmpresa,
                    idTipsoc: d.idTipoSocietario, // CORRECCIÓN 1: Usamos la propiedad correcta.
                    esActivo: d.esActivo,
                    // CORRECCIÓN 2: Usamos 'undefined' en lugar de 'null' y hacemos la propiedad opcional.
                    fechaCambio: d.fechaCambio || undefined 
                });
            }
        }
        
        // Mapeamos los tipos societarios nuevos si existen
        for (const o of tipoSocOtros) {
             // Asegúrate que `createTransaccion` devuelva un objeto con { idTipsoc, esActivo, fechaCambio }
            tiposSocParaGuardar.push({
                idEmpresa: data.idEmpresa,
                ...o
            });
        }

        // Solo guardamos si hay algo que guardar
        if (tiposSocParaGuardar.length > 0) {
            return await manager.getRepository(EmpresaTipoSocietario).save(tiposSocParaGuardar);
        }
        
        return []; // Devolvemos un array vacío si no se creó nada
    }

    findAll() {
        return `This action returns all empresasTiposSocietarios`;
    }

    findOne(id: number) {
        return `This action returns a #${id} empresasTiposSocietario`;
    }

    update(id: number, updateEmpresasTiposSocietarioDto: UpdateEmpresasTiposSocietarioDto) {
        return `This action updates a #${id} empresasTiposSocietario`;
    }

    remove(id: number) {
        return `This action removes a #${id} empresasTiposSocietario`;
    }
}

