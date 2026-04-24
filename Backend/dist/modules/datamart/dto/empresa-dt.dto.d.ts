import { PaisDtDto } from './pais-dt.dto';
import { MunicipioDtDto } from './municipio-dt.dto';
import { SedeDtDto } from './sede-dt.dto';
import { OdsDtDto } from './ods-dt.dto';
export declare class EmpresaDtDto {
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
    paises: PaisDtDto[];
    municipios: MunicipioDtDto[];
    sedes: SedeDtDto[];
    ods: OdsDtDto[];
}
