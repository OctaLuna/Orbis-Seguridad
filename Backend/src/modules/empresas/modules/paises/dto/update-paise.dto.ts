import { PartialType } from '@nestjs/swagger';
import { CreatePaiseDto } from './create-paise.dto';

export class UpdatePaiseDto extends PartialType(CreatePaiseDto) {}
