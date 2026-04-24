import { Empresa } from "src/modules/empresas/entities/empresa.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Municipio } from "../../../entities/municipio.entity";

@Entity('municipios_empresas')
export class MunicipioEmpresa {
    @PrimaryGeneratedColumn({ name: 'id_municipio_empresa' })
    id: number;

    @Column({ type: 'int', name: 'id_empresa' })
    idEmpresa: number;

    @Column({ type: 'int', name: 'id_municipio' })
    idMunicipio: number;

    @ManyToOne(() => Empresa,(empresa) => empresa.municipiosEmpresas)
    @JoinColumn({name: 'id_empresa'})
    empresa: Empresa

    @ManyToOne(() => Municipio,(municipio) => municipio.municipiosEmpresas)
    @JoinColumn({name: 'id_municipio'})
    municipio: Municipio

}
