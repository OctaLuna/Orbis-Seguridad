import { PartialType } from '@nestjs/mapped-types';
import { CreateImplementacionesAccioneDto } from './create-implementaciones-accione.dto';

export class UpdateImplementacionesAccioneDto extends PartialType(CreateImplementacionesAccioneDto) {}
