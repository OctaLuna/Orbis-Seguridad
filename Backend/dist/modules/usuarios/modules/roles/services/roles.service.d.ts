import { UpdateRoleDto } from '../dto/update-role.dto';
import { Rol } from '../entities/rol.entity';
import { Repository } from 'typeorm';
export declare class RolesService {
    private readonly rolRepository;
    constructor(rolRepository: Repository<Rol>);
    update(idRol: number, data: UpdateRoleDto): Promise<Rol>;
}
