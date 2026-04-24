import { Type } from '@nestjs/common';
export declare function validateData<T extends object>(dtoClass: Type<T>, data: any): void;
