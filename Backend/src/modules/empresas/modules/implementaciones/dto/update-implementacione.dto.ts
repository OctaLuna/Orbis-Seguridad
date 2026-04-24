import { PartialType } from '@nestjs/mapped-types';
import { CreateImplementacioneDto } from './create-implementacione.dto';

export class UpdateImplementacioneDto extends PartialType(CreateImplementacioneDto) {}
