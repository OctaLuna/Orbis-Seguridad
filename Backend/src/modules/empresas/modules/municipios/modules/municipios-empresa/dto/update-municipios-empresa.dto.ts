import { PartialType } from '@nestjs/mapped-types';
import { CreateMunicipiosEmpresaDto } from './create-municipios-empresa.dto';

export class UpdateMunicipiosEmpresaDto extends PartialType(CreateMunicipiosEmpresaDto) {}
