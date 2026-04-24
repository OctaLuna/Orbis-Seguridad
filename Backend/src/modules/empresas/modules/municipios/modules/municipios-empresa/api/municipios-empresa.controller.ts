import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MunicipiosEmpresaService } from '../services/municipios-empresa.service';
import { CreateMunicipiosEmpresaDto } from '../dto/create-municipios-empresa.dto';
import { UpdateMunicipiosEmpresaDto } from '../dto/update-municipios-empresa.dto';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController(true)
@Controller('api/municipios-empresa')
export class MunicipiosEmpresaController {
	constructor(private readonly municipiosEmpresaService: MunicipiosEmpresaService) { }

	@Post()
	create(@Body() createMunicipiosEmpresaDto: CreateMunicipiosEmpresaDto) {
		return this.municipiosEmpresaService.create(createMunicipiosEmpresaDto);
	}

	@Get()
	findAll() {
		return this.municipiosEmpresaService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.municipiosEmpresaService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateMunicipiosEmpresaDto: UpdateMunicipiosEmpresaDto) {
		return this.municipiosEmpresaService.update(+id, updateMunicipiosEmpresaDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.municipiosEmpresaService.remove(+id);
	}
}
