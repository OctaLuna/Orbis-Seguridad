import { PartialType } from '@nestjs/mapped-types';
import { CreateTiposSocietarioDto } from './create-tipos-societario.dto';

export class UpdateTiposSocietarioDto extends PartialType(CreateTiposSocietarioDto) {}
