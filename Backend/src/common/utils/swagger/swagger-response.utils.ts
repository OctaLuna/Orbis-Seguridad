import { CommonResponseDto } from "src/shared/dto/common-response.dto";
import { ValidationExceptionDto } from "src/shared/dto/validation-exception.dto";

export const SwaggerBadRequestCommon = () => {
    return {
        description: 'Respuesta en caso de parametros invalidos',
        type: ValidationExceptionDto
    };
}

export const SwaggerNotFoundCommon = () => {
    return {
        description: 'Respuesta en caso de no encontrar un recurso',
        type: CommonResponseDto
    }
}

export const SwaggerConflictCommon = () => {
    return {
        description: 'Respuesta en caso de un conflicto entre datos repetidos',
        type: CommonResponseDto
    }
}