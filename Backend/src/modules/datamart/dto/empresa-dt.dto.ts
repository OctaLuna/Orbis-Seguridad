import { ApiProperty } from '@nestjs/swagger';
import { PaisDtDto } from './pais-dt.dto';
import { MunicipioDtDto } from './municipio-dt.dto';
import { SedeDtDto } from './sede-dt.dto';
import { OdsDtDto } from './ods-dt.dto';

export class EmpresaDtDto {
    @ApiProperty({ description: 'Identificador único de la empresa', type: Number })
    id: number;

    @ApiProperty({ description: 'Nombre de la empresa', type: String })
    nombre: string;

    @ApiProperty({
        description: 'Fecha de fundación de la empresa',
        example: '2001-05-14',
        type: Date,
    })
    fechaFundacion: Date;

    @ApiProperty({
        description: 'Tamaño de la empresa (micro, pequeña, mediana, grande)',
        type: String,
    })
    tamanioEmpresa: string;

    @ApiProperty({ description: 'Indica si la empresa es familiar', type: Boolean })
    empresaFamiliar: boolean;

    @ApiProperty({ description: 'Rubro principal de la empresa', type: String })
    rubro: string;

    @ApiProperty({
        description: 'Indica si el rubro actual es el propio de la empresa',
        type: Boolean,
    })
    esPropioRubro: boolean;

    @ApiProperty({
        description: 'Indica si la empresa ha cambiado de rubro',
        type: Boolean,
    })
    cambioRubro: boolean;

    @ApiProperty({ description: 'Tipo societario de la empresa', type: String })
    tipoSocietaria: string;

    @ApiProperty({
        description: 'Indica si el tipo societario actual es el propio de la empresa',
        type: Boolean,
    })
    esPropioTipoSocietario: boolean;

    @ApiProperty({
        description: 'Indica si ha habido cambio de tipo societario',
        type: Boolean,
    })
    cambioTipoSocietario: boolean;

    @ApiProperty({
        description: 'Ubicación de la oficina central de la empresa',
        type: String,
    })
    oficinaCentral: string;

    @ApiProperty({
        description: 'Indica si realiza operaciones internacionales',
        type: Boolean,
    })
    operacionesInternacionales: boolean;

    @ApiProperty({
        description: 'Indica si la empresa tiene impacto social',
        type: Boolean,
        nullable: true,
    })
    impactoSocial?: boolean;

    @ApiProperty({
        description: 'Indica si la empresa aplica criterios de sostenibilidad',
        type: Boolean,
        nullable: true,
    })
    sostenibilidad?: boolean;

    @ApiProperty({
        description: 'Año de implementación del impacto social',
        example: '2023-01-01',
        type: Date,
        nullable: true,
    })
    anioDeImplementacionImpacto?: Date;

    @ApiProperty({
        description: 'Países donde la empresa tiene presencia',
        type: [PaisDtDto],
    })
    paises: PaisDtDto[];

    @ApiProperty({
        description: 'Municipios donde la empresa opera',
        type: [MunicipioDtDto],
    })
    municipios: MunicipioDtDto[];

    @ApiProperty({
        description: 'Sedes asociadas a la empresa',
        type: [SedeDtDto],
    })
    sedes: SedeDtDto[];

    @ApiProperty({
        description:
            'Objetivos de Desarrollo Sostenible (ODS) asociados a la empresa',
        type: [OdsDtDto],
    })
    ods: OdsDtDto[];
}
