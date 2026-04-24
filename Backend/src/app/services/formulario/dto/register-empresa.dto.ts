import { ApiProperty } from "@nestjs/swagger"
import { string } from "joi"
import { RegisterRubrosDto } from "./rubros/register-rubros.dto"
import { RegisterTiposSocietariosDto } from "./tipos-societarios/register-tipos-societarios.dto"
import { RegisterFamiliaDto } from "./register-familia.dto"
import { RegisterSedeDto } from "./register-sede.dto"
import { RegisterReconocimientoDto } from "./register-reconocimiento.dto"
import { RegisterImplementacionDto } from "./implementacion/register-implementacion.dto"
import { RegisterHitoDto } from "./register-hito.dto"

export class RegisterEmpresaDto {
    @ApiProperty({
        description: 'Nombre de la empresa',
        type: String
    })
    nombre: string

    @ApiProperty({
        description: 'Registro de rubro para la empresa',
        type: RegisterRubrosDto
    })
    rubros: RegisterRubrosDto

    @ApiProperty({
        description: 'Actividad principal detallada de la empresa',
        type: String,
        nullable: false
    })
    actividad: string

    @ApiProperty({
        description: 'Items que ofrece le empresa',
        type: [String]
    })
    items: string[]

    @ApiProperty({
        description: 'Servicio que la empresa ofrese',
        type: [String],
        isArray: true,
        example: ['servicio1','servicio2']
    })
    servicios: string[]

    @ApiProperty({
        description: 'Direccion web de la empresa',
        type: String
    })
    direccionWeb: string

    @ApiProperty({
        description: 'Fecha de fundacion de la empresa',
        type: String,
        example: '2000-01-01'
    })
    fechaFundacion: string

    @ApiProperty({
        description: 'Fundadores de la empresa',
        type: [String],
        isArray: true,
        example: ['Jaime','Octavio','Sergio']
    })
    fundadores: string[]

    @ApiProperty({
        description: 'Tipos societarios de la empresa',
        type: RegisterTiposSocietariosDto
    })
    tiposSocietarios: RegisterTiposSocietariosDto

    @ApiProperty({
        description: 'Id del el tamanio de la empresa seleccionada',
        type: Number
    })
    tamanioEmpresa: number

    @ApiProperty({
        description: 'Mision de la empresa',
        type: String
    })
    mision: string

    @ApiProperty({
        description: 'Vision de la empresa',
        type: String
    })
    vision: string

    @ApiProperty({
        description: 'Pregunta 15.1 y 15.2',
        type: RegisterFamiliaDto
    })
    familia: RegisterFamiliaDto

    @ApiProperty({
        description: 'Sedes en la que la empresa opera',
        type: [RegisterSedeDto]
    })
    sedes: RegisterSedeDto[]

    @ApiProperty({
        description: 'Id de municipio donde las sedes se encuentran, filtrar por departamentos elejidos',
        type: [Number],
        example: [1,2,3]
    })
    municipios: number[]

    @ApiProperty({
        description: 'Ids de paises en los que la empresa opera internacionamente',
        type: [Number],
        example: [1,2,3]
    })
    paisesOperaInternacionalmente: number[]

    @ApiProperty({
        description: 'Reconocimientos de la empresa',
        type: [RegisterReconocimientoDto]
    })
    reconocimientos: RegisterReconocimientoDto[]

    @ApiProperty({
        description: 'Urls de imagenes que tiene la empresa',
        type: [String]
    })
    imagenes: string[]

    @ApiProperty({
        description: 'Mensaje conmemorativo de la empresa',
        type: String
    })
    mensajeConmemorativo: string

    @ApiProperty({
        description: 'Esta seccion encapsula las ultimas 3 preguntas, sin contar la de hitos',
        type: RegisterImplementacionDto
    })
    implementacion: RegisterImplementacionDto

    @ApiProperty({
        description: 'Hitos de la empresa',
        type: [RegisterHitoDto]
    })
    hitos: RegisterHitoDto[]
}