import { RegisterSedeDto } from "src/app/services/formulario/dto/register-sede.dto"

export class CreateSedeDto {
    idEmpresa: number
    sedes: RegisterSedeDto[]
}
