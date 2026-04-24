import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmpresaDt } from '../entities/empresa-dt.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DatamartService {
	constructor(
		@InjectRepository(EmpresaDt)
		private readonly empresaDtRepository: Repository<EmpresaDt>
	){}

	async findAll(){
		const empresas = await this.empresaDtRepository.find({
			select: {
				id: true,
				nombre: true,
				fechaFundacion: true,
				tamanioEmpresa: true,
				empresaFamiliar: true,
				rubro: true,
				esPropioRubro: true,
				cambioRubro: true,
				tipoSocietaria: true,
				esPropioTipoSocietario: true,
				cambioTipoSocietario: true,
				oficinaCentral: true,
				operacionesInternacionales: true,
				impactoSocial: true,
				sostenibilidad: true,
				anioDeImplementacionImpacto: true,
				sedes: {
					id: true,
					nombre: true,
				},
				paises: {
					id: true,
					nombre: true,
				},
				municipios: {
					id: true,
					nombre: true,
				},
				ods: {
					id: true,
					nombre: true,
					proyectos: {
						id: true,
						nombre: true
					}
				},
			},
			relations: {
				sedes: true,
				paises: true,
				municipios: true,
				ods: {
					proyectos: true,
				},
			}
		});
		return empresas;
	}
}
