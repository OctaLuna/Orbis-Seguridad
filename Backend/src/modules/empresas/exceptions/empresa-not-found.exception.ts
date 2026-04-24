import { NotFoundException } from "@nestjs/common";

export class EmpresaNotFoundException extends NotFoundException {
    constructor(idEmpresa: number){
        super({
            message: `La empresa con id = ${idEmpresa} non existe`
        })
    }
}