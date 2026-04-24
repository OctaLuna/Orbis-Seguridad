import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MunicipioDt } from "./municipio-dt.entity";
import { OdsDt } from "./ods-dt.entity";
import { PaisDt } from "./pais-dt.entity";
import { SedeDt } from "./sede-dt.entity";

@Entity('empresas_dt')
export class EmpresaDt {
    @PrimaryGeneratedColumn({ name: 'id_empresa' })
    id: number;

    @Column({ name: 'nombre_empresa', type: 'text' })
    nombre: string;

    @Column({ name: 'fecha_fundacion', type: 'date' })
    fechaFundacion: Date;

    @Column({ name: 'tamanio_empresa', type: 'text' })
    tamanioEmpresa: string;

    @Column({ name: 'empresa_familiar', type: 'boolean' })
    empresaFamiliar: boolean;

    @Column({ name: 'rubro', type: 'text' })
    rubro: string;

    @Column({ name: 'es_propio_rubro', type: 'boolean' })
    esPropioRubro: boolean;

    @Column({ name: 'cambio_rubro', type: 'boolean' })
    cambioRubro: boolean;

    @Column({ name: 'tipo_societaria', type: 'text' })
    tipoSocietaria: string;

    @Column({ name: 'es_propio_tipo_societario', type: 'boolean' })
    esPropioTipoSocietario: boolean;

    @Column({ name: 'cambio_tipo_societario', type: 'boolean' })
    cambioTipoSocietario: boolean;

    @Column({ name: 'oficina_central', type: 'text' })
    oficinaCentral: string;

    @Column({ name: 'operaciones_internacionales', type: 'boolean' })
    operacionesInternacionales: boolean;

    @Column({ name: 'impacto_social', type: 'boolean', nullable: true })
    impactoSocial?: boolean;

    @Column({ name: 'sostenibilidad', type: 'boolean', nullable: true })
    sostenibilidad?: boolean;

    @Column({ name: 'anio_de_implementacion_impacto', type: 'date', nullable: true })
    anioDeImplementacionImpacto?: Date;

    @OneToMany(() => PaisDt, (pais) => pais.empresa)
    paises: PaisDt[];

    @OneToMany(() => MunicipioDt, (municipio) => municipio.empresa)
    municipios: MunicipioDt[];

    @OneToMany(() => SedeDt, (sede) => sede.empresa)
    sedes: SedeDt[];

    @OneToMany(() => OdsDt, (ods) => ods.empresa)
    ods: OdsDt[];
}
