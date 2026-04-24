import { PartialType } from '@nestjs/mapped-types';
import { CreateTiposAccioneDto } from './create-tipos-accione.dto';

export class UpdateTiposAccioneDto extends PartialType(CreateTiposAccioneDto) {}
