import { Injectable, BadRequestException } from '@nestjs/common';
import * as zxcvbn from 'zxcvbn';

interface ReglaPassword {
    descripcion: string;
    cumplida: (p: string) => boolean;
}

@Injectable()
export class PasswordValidatorService {
    private readonly reglas: ReglaPassword[] = [
        {
            descripcion: 'Mínimo 12 caracteres',
            cumplida: (p) => p.length >= 12,
        },
        {
            descripcion: 'Al menos una letra mayúscula',
            cumplida: (p) => /[A-Z]/.test(p),
        },
        {
            descripcion: 'Al menos una letra minúscula',
            cumplida: (p) => /[a-z]/.test(p),
        },
        {
            descripcion: 'Al menos un número',
            cumplida: (p) => /\d/.test(p),
        },
        {
            descripcion: 'Al menos un carácter especial (!@#$%^&*...)',
            cumplida: (p) => /[^A-Za-z0-9]/.test(p),
        },
    ];

    /**
     * Lanza BadRequestException si la contraseña no cumple los requisitos.
     * También verifica fortaleza con zxcvbn (score mínimo: 2 de 4).
     */
    validar(password: string): void {
        const fallidas = this.reglas
            .filter((r) => !r.cumplida(password))
            .map((r) => r.descripcion);

        if (fallidas.length > 0) {
            throw new BadRequestException({
                message: 'La contraseña no cumple los requisitos de seguridad',
                errores: fallidas,
            });
        }

        const resultado = (zxcvbn as any)(password);
        if (resultado.score < 2) {
            throw new BadRequestException({
                message: 'La contraseña es demasiado predecible o común',
                sugerencia: resultado.feedback?.suggestions?.[0] ?? 'Usa una combinación más única',
            });
        }
    }

    /**
     * Retorna el estado de cada regla sin lanzar excepción.
     * Útil para el checklist visual del frontend.
     */
    obtenerEstadoReglas(password: string): { descripcion: string; cumplida: boolean }[] {
        return this.reglas.map((r) => ({
            descripcion: r.descripcion,
            cumplida: r.cumplida(password),
        }));
    }
}
