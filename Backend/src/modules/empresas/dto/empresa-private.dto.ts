import { ApiProperty } from "@nestjs/swagger";
import { TamanioEmpresaPrivateDto } from "../modules/tamanios-empresas/dto/tamanio-empresa-private.dto";
import { RubroEmpresaPrivateDto } from "../modules/rubros/modules/rubros-empresas/dto/rubro-empresa-private.dto";
import { SedePrivateDto } from "../modules/sedes/dto/sede-private.dto";
import { MunicipioPrivateDto } from "../modules/municipios/dto/municipio-private.dto";
import { ServicioPrivateDto } from "../modules/servicios/dto/servicio-private.dto";
import { ItemPrivateDto } from "../modules/items/dto/item-private.dto";
import { EmpresaTipoSocietarioPrivateDto } from "../modules/tipos-societarios/modules/empresas-tipos-societarios/dto/empresa-tipo-societario-private.dto";
import { HitoPublicDto } from "../modules/hitos/dto/hito-public.dto";
import { PremioPrivateDto } from "../modules/premios/dto/premio-private.dto";
import { FamiliaPrivateDto } from "../modules/familias/dto/familia-private.dto";
import { PaisDto } from "../modules/paises/dto/pais.dto";
import { FundadorDto } from "../modules/fundadores/dto/fundador.dto";
import { ImagenCardDto } from "../modules/imagenes/dto/imagen-card.dto";
import { ImplementacionPrivateDto } from "../modules/implementaciones/dto/implementacion-private.dto";

export class EmpresaPrivateDto {
    @ApiProperty({
        description: 'Id de la empresa',
        type: Number
    })
    id: number

    @ApiProperty({
        description: 'Nombre de la empresa',
        type: String
    })
    nombreComercial: string

    @ApiProperty({
        description: 'Fecha de fundacion',
        type: String
    })
    fechaFundacion: string

    @ApiProperty({
        description: 'Vision de la empresa',
        type: String
    })
    vision: string

    @ApiProperty({
        description: 'Mision de la empresa',
        type: String
    })
    mision: string

    @ApiProperty({
        description: 'Direccion web',
        type: String
    })
    direccionWeb: string

    @ApiProperty({
        description: 'Tmanio de la empresa',
        type: TamanioEmpresaPrivateDto
    })
    tamanioEmpresa: TamanioEmpresaPrivateDto

    @ApiProperty({
        description: 'Mensaje de la empresas',
        type: String
    })
    mensaje: string

    @ApiProperty({
        description: 'Actividad de la empresa',
        type: String
    })
    actividad: string

    @ApiProperty({
        description: 'Lista de rubros relacionados con la empresa',
        type: [RubroEmpresaPrivateDto]
    })
    rubrosEmpresa: RubroEmpresaPrivateDto[]

    @ApiProperty({
        description: 'Sedes de la empresa',
        type: [SedePrivateDto]
    })
    sedes: SedePrivateDto[]

    @ApiProperty({
        description: 'Municipios donde se encuentra la empresa',
        type: [MunicipioPrivateDto]
    })
    municipios: MunicipioPrivateDto[]

    @ApiProperty({
        description: 'Servicio de la empresa',
        type: [ServicioPrivateDto]
    })
    servicios: ServicioPrivateDto[]

    @ApiProperty({
        description: 'Items de la empresa',
        type: [ItemPrivateDto]
    })
    items: ItemPrivateDto[]

    @ApiProperty({
        description: 'Id de la relacion entre los tipos de societario y la empresa',
        type: [EmpresaTipoSocietarioPrivateDto]
    })
    tiposSocietariosEmpresa: EmpresaTipoSocietarioPrivateDto[]

    @ApiProperty({
        description: 'Hitos de la empresa',
        type: [HitoPublicDto]
    })
    hitos: HitoPublicDto[]

    @ApiProperty({
        description: 'Premios de la empresa',
        type: [PremioPrivateDto]
    })
    premios: PremioPrivateDto[]

    @ApiProperty({
        description: 'Familiar de la empresas',
        type: [FamiliaPrivateDto]
    })
    familias: FamiliaPrivateDto[]

    @ApiProperty({
        description: 'Paises en que la empresa opera internacionalmente',
        type: [PaisDto]
    })
    paisesOperaInteranacionalmente: PaisDto[]

    @ApiProperty({
        description: 'Fundadore de la empresa',
        type: [FundadorDto]
    })
    fundadores: FundadorDto[]

    @ApiProperty({
        description: 'Lista de url de imagenens de la empresa',
        type: [ImagenCardDto]
    })
    imagenes: ImagenCardDto[]

    @ApiProperty({
        description: 'Implementacion de empresa',
        type: ImplementacionPrivateDto
    })
    implementacion: ImplementacionPrivateDto
}