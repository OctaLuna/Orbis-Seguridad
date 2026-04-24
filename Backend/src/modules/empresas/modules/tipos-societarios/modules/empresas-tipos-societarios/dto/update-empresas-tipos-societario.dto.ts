import { PartialType } from '@nestjs/mapped-types';
import { CreateEmpresasTiposSocietarioDto } from './create-empresas-tipos-societario.dto';

export class UpdateEmpresasTiposSocietarioDto extends PartialType(CreateEmpresasTiposSocietarioDto) {}
