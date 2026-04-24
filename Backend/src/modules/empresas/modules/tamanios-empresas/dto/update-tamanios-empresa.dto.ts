import { PartialType } from '@nestjs/mapped-types';
import { CreateTamaniosEmpresaDto } from './create-tamanios-empresa.dto';

export class UpdateTamaniosEmpresaDto extends PartialType(CreateTamaniosEmpresaDto) {}
