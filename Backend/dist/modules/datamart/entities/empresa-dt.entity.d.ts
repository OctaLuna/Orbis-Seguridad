import { MunicipioDt } from "./municipio-dt.entity";
import { OdsDt } from "./ods-dt.entity";
import { PaisDt } from "./pais-dt.entity";
import { SedeDt } from "./sede-dt.entity";
export declare class EmpresaDt {
    id: number;
    nombre: string;
    fechaFundacion: Date;
    tamanioEmpresa: string;
    empresaFamiliar: boolean;
    rubro: string;
    esPropioRubro: boolean;
    cambioRubro: boolean;
    tipoSocietaria: string;
    esPropioTipoSocietario: boolean;
    cambioTipoSocietario: boolean;
    oficinaCentral: string;
    operacionesInternacionales: boolean;
    impactoSocial?: boolean;
    sostenibilidad?: boolean;
    anioDeImplementacionImpacto?: Date;
    paises: PaisDt[];
    municipios: MunicipioDt[];
    sedes: SedeDt[];
    ods: OdsDt[];
}
