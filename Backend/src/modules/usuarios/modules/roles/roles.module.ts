import { Module } from '@nestjs/common';
import { RolesService } from './services/roles.service';
import { RolesController } from './api/roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from './entities/rol.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([Rol])
	],
	controllers: [RolesController],
	providers: [RolesService],
	exports: [RolesService]
})
export class RolesModule { }
