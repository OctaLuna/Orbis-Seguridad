import { PartialType } from '@nestjs/mapped-types';
import { CreateOperacionesInternacionaleDto } from './create-operaciones-internacionale.dto';

export class UpdateOperacionesInternacionaleDto extends PartialType(CreateOperacionesInternacionaleDto) {}
