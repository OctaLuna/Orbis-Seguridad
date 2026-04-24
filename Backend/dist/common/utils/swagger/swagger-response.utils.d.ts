import { CommonResponseDto } from "src/shared/dto/common-response.dto";
import { ValidationExceptionDto } from "src/shared/dto/validation-exception.dto";
export declare const SwaggerBadRequestCommon: () => {
    description: string;
    type: typeof ValidationExceptionDto;
};
export declare const SwaggerNotFoundCommon: () => {
    description: string;
    type: typeof CommonResponseDto;
};
export declare const SwaggerConflictCommon: () => {
    description: string;
    type: typeof CommonResponseDto;
};
