import { FindAllEmpresasCardsPublicParamsDto } from "./find-all-empresas-cards-public-params.dto";
export declare class FindAllEmpresasCardsParamsDto extends FindAllEmpresasCardsPublicParamsDto {
    rubros?: string;
    departamentos?: string;
    tiposSocietarios?: string;
    antiguedad?: number;
    fundador?: string;
    getRubros(): number[];
    getDepartamentos(): number[];
    getTiposSocietarios(): number[];
    getAntiguedad(): number | undefined;
    getNombre(): string | undefined;
    getFundador(): string;
}
