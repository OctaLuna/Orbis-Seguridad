import { PartialType } from '@nestjs/mapped-types';
import { CreateRubroDto } from './create-rubro.dto';

export class UpdateRubroDto extends PartialType(CreateRubroDto) {}
