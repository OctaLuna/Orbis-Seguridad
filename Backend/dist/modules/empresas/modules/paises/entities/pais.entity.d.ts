import { OperacionInternacional } from "../../operaciones-internacionales/entities/operacion-internacional.entity";
import { Empresa } from "src/modules/empresas/entities/empresa.entity";
export declare class Pais {
    id: number;
    nombre: string;
    operacionesInternacionales: OperacionInternacional[];
    empresas: Empresa[];
}
