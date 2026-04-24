import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from '../entities/rol.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
	constructor(
		@InjectRepository(Rol)
		private readonly rolRepository: Repository<Rol>
	){}

	async update(idRol: number,data: UpdateRoleDto){
		const rol = await this.rolRepository.findOne({
			where: {
				id: idRol
			}
		})
		rol!.nombre = data.nombre;
		return await this.rolRepository.save(rol!);
	}
}
