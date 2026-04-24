// validation.helper.ts
import { Type, BadRequestException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateSync, ValidationError } from 'class-validator';

export function validateData<T extends object>(dtoClass: Type<T>, data: any): void {
    const dto = plainToInstance(dtoClass, data);

    const errores: ValidationError[] = validateSync(dto, {
        whitelist: true,
        forbidNonWhitelisted: true,
    });

    if (errores.length > 0) {
        const mensajes = errores
            .map(e => Object.values(e.constraints || {}))
            .flat();
        throw new BadRequestException(mensajes);
    }
}
