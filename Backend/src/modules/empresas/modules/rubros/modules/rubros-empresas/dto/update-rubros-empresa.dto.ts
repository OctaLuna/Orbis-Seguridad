import { PartialType } from '@nestjs/mapped-types';
import { CreateRubrosEmpresaDto } from './create-rubros-empresa.dto';

export class UpdateRubrosEmpresaDto extends PartialType(CreateRubrosEmpresaDto) {}
