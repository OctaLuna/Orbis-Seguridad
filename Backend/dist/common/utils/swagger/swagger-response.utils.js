"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerConflictCommon = exports.SwaggerNotFoundCommon = exports.SwaggerBadRequestCommon = void 0;
const common_response_dto_1 = require("../../../shared/dto/common-response.dto");
const validation_exception_dto_1 = require("../../../shared/dto/validation-exception.dto");
const SwaggerBadRequestCommon = () => {
    return {
        description: 'Respuesta en caso de parametros invalidos',
        type: validation_exception_dto_1.ValidationExceptionDto
    };
};
exports.SwaggerBadRequestCommon = SwaggerBadRequestCommon;
const SwaggerNotFoundCommon = () => {
    return {
        description: 'Respuesta en caso de no encontrar un recurso',
        type: common_response_dto_1.CommonResponseDto
    };
};
exports.SwaggerNotFoundCommon = SwaggerNotFoundCommon;
const SwaggerConflictCommon = () => {
    return {
        description: 'Respuesta en caso de un conflicto entre datos repetidos',
        type: common_response_dto_1.CommonResponseDto
    };
};
exports.SwaggerConflictCommon = SwaggerConflictCommon;
//# sourceMappingURL=swagger-response.utils.js.map