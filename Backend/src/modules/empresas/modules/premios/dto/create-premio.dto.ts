import { RegisterReconocimientoDto } from "src/app/services/formulario/dto/register-reconocimiento.dto"

export class CreatePremioDto {
    idEmpresa: number
    reconocimientos: RegisterReconocimientoDto[]
}
