import { PartialType } from '@nestjs/mapped-types';
import { CreateFundadoreDto } from './create-fundadore.dto';

export class UpdateFundadoreDto extends PartialType(CreateFundadoreDto) {}
