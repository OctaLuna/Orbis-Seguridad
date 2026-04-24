import { FormularioService } from "../services/formulario.service";
import { Response } from "express";
import { RegisterEmpresaDto } from "../dto/register-empresa.dto";
export declare class FormularioController {
    private readonly formularioService;
    constructor(formularioService: FormularioService);
    registerEmpresa(data: RegisterEmpresaDto, res: Response): Promise<Response<any, Record<string, any>>>;
}
