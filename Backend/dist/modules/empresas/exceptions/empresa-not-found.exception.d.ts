import { NotFoundException } from "@nestjs/common";
export declare class EmpresaNotFoundException extends NotFoundException {
    constructor(idEmpresa: number);
}
