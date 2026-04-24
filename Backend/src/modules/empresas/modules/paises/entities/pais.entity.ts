import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OperacionInternacional } from "../../operaciones-internacionales/entities/operacion-internacional.entity";
import { Empresa } from "src/modules/empresas/entities/empresa.entity";

@Entity('paises')
export class Pais {
    @PrimaryGeneratedColumn({name: 'id_pais'})
    id: number

    @Column({name: 'nombre'})
    nombre: string

    @OneToMany(() => OperacionInternacional,(opeInter) => opeInter.pais)
    operacionesInternacionales: OperacionInternacional[]

    @ManyToMany(() => Empresa,(empresa) => empresa.paisesOperaInteranacionalmente)
    empresas: Empresa[]
}
