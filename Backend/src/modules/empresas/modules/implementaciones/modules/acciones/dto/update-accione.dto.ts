import { PartialType } from '@nestjs/mapped-types';
import { CreateAccioneDto } from './create-accione.dto';

export class UpdateAccioneDto extends PartialType(CreateAccioneDto) {}
