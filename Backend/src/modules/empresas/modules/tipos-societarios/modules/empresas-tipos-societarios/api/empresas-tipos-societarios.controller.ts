import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmpresasTiposSocietariosService } from '../services/empresas-tipos-societarios.service';
import { CreateEmpresasTiposSocietarioDto } from '../dto/create-empresas-tipos-societario.dto';
import { UpdateEmpresasTiposSocietarioDto } from '../dto/update-empresas-tipos-societario.dto';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController(true)
@Controller('api/empresas-tipos-societarios')
export class EmpresasTiposSocietariosController {
	constructor(private readonly empresasTiposSocietariosService: EmpresasTiposSocietariosService) { }

	@Post()
	create(@Body() createEmpresasTiposSocietarioDto: CreateEmpresasTiposSocietarioDto) {
		return this.empresasTiposSocietariosService.create(createEmpresasTiposSocietarioDto);
	}

	@Get()
	findAll() {
		return this.empresasTiposSocietariosService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.empresasTiposSocietariosService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateEmpresasTiposSocietarioDto: UpdateEmpresasTiposSocietarioDto) {
		return this.empresasTiposSocietariosService.update(+id, updateEmpresasTiposSocietarioDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.empresasTiposSocietariosService.remove(+id);
	}
}
