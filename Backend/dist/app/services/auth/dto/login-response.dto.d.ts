import { CommonResponseDto } from "src/shared/dto/common-response.dto";
export declare class LoginResponseDto extends CommonResponseDto {
    access_token: string;
    idUsuario: string;
    idRol: number;
}
