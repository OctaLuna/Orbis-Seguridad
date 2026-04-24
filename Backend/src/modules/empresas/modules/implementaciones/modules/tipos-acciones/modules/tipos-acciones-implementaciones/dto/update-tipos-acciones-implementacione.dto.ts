import { PartialType } from '@nestjs/mapped-types';
import { CreateTiposAccionesImplementacioneDto } from './create-tipos-acciones-implementacione.dto';

export class UpdateTiposAccionesImplementacioneDto extends PartialType(CreateTiposAccionesImplementacioneDto) {}
