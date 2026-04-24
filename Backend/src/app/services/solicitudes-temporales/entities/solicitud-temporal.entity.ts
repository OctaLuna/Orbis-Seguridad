// ./entities/solicitud-temporal.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('solicitudes_temporales')
export class SolicitudTemporal {
  @PrimaryGeneratedColumn({ name: 'id_solicitud', type: 'bigint' })
  id: number;

  @Column({ name: 'correo', type: 'varchar', length: 100 })
  correo: string;

  @Column({ name: 'justificacion', type: 'text' })
  justificacion: string;

  @Column({ name: 'es_aprobado', type: 'boolean', nullable: true, default: null })
  esAprobado: boolean | null;

  @Column({ name: 'fecha_uso', type: 'timestamp' })
  fechaUso: Date;

  @CreateDateColumn({ name: 'fecha', type: 'timestamp' })
  fecha: Date;
}
