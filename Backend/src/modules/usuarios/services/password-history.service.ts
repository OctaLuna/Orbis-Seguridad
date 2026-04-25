import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { PasswordHistory } from '../entities/password-history.entity';

const HISTORIAL_MAX = 10;

@Injectable()
export class PasswordHistoryService {
    constructor(
        @InjectRepository(PasswordHistory)
        private readonly repo: Repository<PasswordHistory>,
    ) {}

    /**
     * Verifica que la nueva contraseña no haya sido usada antes.
     * Lanza BadRequestException si está en el historial.
     */
    async verificarReutilizacion(idUsuario: number, passwordPlano: string): Promise<void> {
        const historial = await this.repo.find({
            where: { idUsuario },
            order: { createdAt: 'DESC' },
            take: HISTORIAL_MAX,
        });

        for (const entrada of historial) {
            const reutilizada = await bcrypt.compare(passwordPlano, entrada.passwordHash);
            if (reutilizada) {
                throw new BadRequestException(
                    `No puedes usar una contraseña que ya utilizaste en los últimos ${HISTORIAL_MAX} cambios`,
                );
            }
        }
    }

    /**
     * Guarda un nuevo hash en el historial y limpia entradas antiguas.
     */
    async guardarEnHistorial(idUsuario: number, hashNuevo: string): Promise<void> {
        await this.repo.save({ idUsuario, passwordHash: hashNuevo });

        const todas = await this.repo.find({
            where: { idUsuario },
            order: { createdAt: 'DESC' },
        });

        if (todas.length > HISTORIAL_MAX) {
            const aEliminar = todas.slice(HISTORIAL_MAX).map((h) => h.id);
            await this.repo.delete(aEliminar);
        }
    }

    /**
     * Retorna fechas de cambio (sin hashes) para el panel de admin.
     */
    async obtenerRegistroFechas(idUsuario: number): Promise<{ fecha: Date }[]> {
        const historial = await this.repo.find({
            where: { idUsuario },
            order: { createdAt: 'DESC' },
            select: ['createdAt'],
        });
        return historial.map((h) => ({ fecha: h.createdAt }));
    }
}
