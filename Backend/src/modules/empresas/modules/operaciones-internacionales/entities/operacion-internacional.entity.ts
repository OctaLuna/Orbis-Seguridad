import { Empresa } from "src/modules/empresas/entities/empresa.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Pais } from "../../paises/entities/pais.entity";

@Entity('operaciones_internacionales')
export class OperacionInternacional {
    @PrimaryGeneratedColumn({ name: 'id_operacion' })
    id: number;

    @Column({name: 'id_pais', type: 'int'})
    idPais: number;

    @Column({ type: 'int', name: 'id_empresa' })
    idEmpresa: number;

    @Column({ type: 'varchar', length: 200, name: 'url', nullable: true })
    url: string;

    @ManyToOne(() => Empresa,(empresa) => empresa.operacionesInternacionales)
    @JoinColumn({name: 'id_empresa'})
    empresa: Empresa

    @ManyToOne(() => Pais,(pais) => pais.operacionesInternacionales)
    @JoinColumn({name: 'id_pais'})
    pais: Pais
}
