import { PartialType } from '@nestjs/swagger';
import { CreateAccioneDto } from './create-accione.dto';

export class UpdateAccioneDto extends PartialType(CreateAccioneDto) {}
