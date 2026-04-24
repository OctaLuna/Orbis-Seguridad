import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MunicipioEmpresa } from "../modules/municipios-empresa/entities/municipio-empresa.entity";
import { Empresa } from "src/modules/empresas/entities/empresa.entity";

@Entity('municipios')
export class Municipio {
    @PrimaryGeneratedColumn({ name: 'id_municipio' })
    id: number;

    @Column({ type: 'int', name: 'id_departamento' })
    idDepartamento: number;

    @Column({ type: 'varchar', length: 100, name: 'nombre_municipio' })
    nombreMunicipio: string;

    @OneToMany(() => MunicipioEmpresa,(municipioEmpresa) => municipioEmpresa.municipio)
    municipiosEmpresas: MunicipioEmpresa[]

    @ManyToMany(() => Empresa,(empresa) => empresa.municipios)
    empresas: Empresa[]
}
