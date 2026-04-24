import { Empresa } from "src/modules/empresas/entities/empresa.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('servicios')
export class Servicio {
    @PrimaryGeneratedColumn({name: 'id_servicio'})
    id: number

    @Column({name: 'nombre'})
    nombre: string

    @Column({name: 'id_empresa',type: 'int'})
    idEmpresa: number

    @ManyToOne(() => Empresa,(empresa) => empresa.servicios)
    @JoinColumn({name: 'id_empresa'})
    empresa: Empresa
}
