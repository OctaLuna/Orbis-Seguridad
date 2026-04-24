import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Sede } from "../modules/sedes/entities/sede.entity";
import { Familia } from "../modules/familias/entities/familia.entity";
import { Fundador } from "../modules/fundadores/entities/fundador.entity";
import { Hito } from "../modules/hitos/entities/hito.entity";
import { Imagen } from "../modules/imagenes/entities/imagen.entity";
import { Implementacion } from "../modules/implementaciones/entities/implementacion.entity";
import { Item } from "../modules/items/entities/item.entity";
import { MunicipioEmpresa } from "../modules/municipios/modules/municipios-empresa/entities/municipio-empresa.entity";
import { Municipio } from "../modules/municipios/entities/municipio.entity";
import { OperacionInternacional } from "../modules/operaciones-internacionales/entities/operacion-internacional.entity";
import { Premio } from "../modules/premios/entities/premio.entity";
import { RubroEmpresa } from "../modules/rubros/modules/rubros-empresas/entities/rubro-empresa.entity";
import { Servicio } from "../modules/servicios/entities/servicio.entity";
import { TamanioEmpresa } from "../modules/tamanios-empresas/entities/tamanio-empresa.entity";
import { EmpresaTipoSocietario } from "../modules/tipos-societarios/modules/empresas-tipos-societarios/entities/empresa-tipo-societario.entity";
import { Pais } from "../modules/paises/entities/pais.entity";

@Entity('empresas')
export class Empresa {
    @PrimaryGeneratedColumn({ name: 'id_empresa' })
    id: number;

    @Column({ type: 'varchar', length: 100, name: 'nombre_comercial' })
    nombreComercial: string;

    @Column({ type: 'date', name: 'fecha_fundacion' })
    fechaFundacion: string;

    @Column({ type: 'text', name: 'vision' })
    vision: string;

    @Column({ type: 'text', name: 'mision' })
    mision: string;

    @Column({ type: 'text', name: 'direccion_web' })
    direccionWeb: string;

    @Column({ name: 'actividad' })
    actividad: string;

    @Column({ type: 'int', name: 'id_tamanio' })
    idTamanio: number;

    @Column({ type: 'text', name: 'mensaje' })
    mensaje: string;

    @OneToMany(() => Sede,(sede) => sede.empresa)
    sedes: Sede[]

    @OneToMany(() => Familia,(familia) => familia.empresa)
    familias: Familia[]

    @OneToMany(() => Fundador,(fundador) => fundador.empresa)
    fundadores: Fundador[]
    
    @OneToMany(() => Hito,(hito) => hito.empresa)
    hitos: Hito[]

    @OneToMany(() => Imagen,(imagen) => imagen.empresa)
    imagenes: Imagen[]

    @OneToOne(() => Implementacion,(imple) => imple.empresa)
    implementacion: Implementacion

    @OneToMany(() => Item,(item) => item.empresa)
    items: Item[]

    @OneToMany(() => MunicipioEmpresa,(muniEmpre) => muniEmpre.empresa)
    municipiosEmpresas: MunicipioEmpresa[]

    @ManyToMany(() => Municipio,(municipio) => municipio.empresas)
    @JoinTable({
        name: 'municipios_empresas',
        joinColumn: { name: 'id_empresa'},
        inverseJoinColumn: { name: 'id_municipio'}
    })
    municipios: Municipio[]

    @OneToMany(() => OperacionInternacional,(operacionInternacional) => operacionInternacional.empresa)
    operacionesInternacionales: OperacionInternacional[]

    @ManyToMany(() => Pais,(pais) => pais.empresas)
    @JoinTable({
        name: 'operaciones_internacionales',
        joinColumn: { name: 'id_empresa' },
        inverseJoinColumn: { name: 'id_pais' }
    })
    paisesOperaInteranacionalmente: Pais[]

    @OneToMany(() => Premio,(premio) => premio.empresa)
    premios: Premio[]

    @OneToMany(() => RubroEmpresa,(rubroEmpresa) => rubroEmpresa.empresa)
    rubrosEmpresa: RubroEmpresa[] 

    @OneToMany(() => Servicio,(servicio) => servicio.empresa)
    servicios: Servicio[]

    @ManyToOne(() => TamanioEmpresa,(tam) => tam.empresas)
    @JoinColumn({name: 'id_tamanio'})
    tamanioEmpresa: TamanioEmpresa

    @OneToMany(() => EmpresaTipoSocietario,(empre) => empre.empresa)
    tiposSocietariosEmpresa: EmpresaTipoSocietario[]
}
