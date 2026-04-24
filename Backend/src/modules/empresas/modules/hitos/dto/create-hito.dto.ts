import { RegisterHitoDto } from "src/app/services/formulario/dto/register-hito.dto"

export class CreateHitoDto {
    idEmpresa: number
    hitos: RegisterHitoDto[]
}
