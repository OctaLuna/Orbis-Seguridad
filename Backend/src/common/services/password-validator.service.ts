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

    private readonly traducciones: Record<string, string> = {
        'Use a few words, avoid common phrases': 'Usa palabras poco comunes',
        'No need for symbols, digits, or uppercase letters': 'Agrega variedad a tu contraseña',
        'Add another word or two. Uncommon words are better.': 'Agrega más palabras. Las poco comunes son mejores.',
        'Straight rows of keys are easy to guess': 'Las secuencias de teclado son fáciles de adivinar',
        'Short keyboard patterns are easy to guess': 'Los patrones cortos de teclado son fáciles de adivinar',
        'Use a longer keyboard pattern with more turns': 'Usa un patrón más largo con más variedad',
        'Repeats like "aaa" are easy to guess': 'Las repeticiones como "aaa" son fáciles de adivinar',
        'Repeats like "abcabc" are only slightly harder to guess than "abc"': 'Evita repetir secuencias',
        'Sequences like abc or 6543 are easy to guess': 'Las secuencias como abc o 6543 son fáciles',
        'Recent years are easy to guess': 'Los años recientes son fáciles de adivinar',
        'Dates are often easy to guess': 'Las fechas son fáciles de adivinar',
        'This is a top-10 common password': 'Esta es una de las 10 contraseñas más comunes',
        'This is a top-100 common password': 'Esta es una de las 100 contraseñas más comunes',
        'This is a very common password': 'Esta es una contraseña muy común',
        'This is similar to a commonly used password': 'Es similar a una contraseña muy usada',
        'A word by itself is easy to guess': 'Una sola palabra es fácil de adivinar',
        'Names and surnames by themselves are easy to guess': 'Los nombres solos son fáciles de adivinar',
        'Common names and surnames are easy to guess': 'Los nombres comunes son fáciles de adivinar',
    };

    validar(password: string): void {
        const reglasFallidas = this.reglas
            .filter((r) => !r.cumplida(password))
            .map((r) => r.descripcion);

        if (reglasFallidas.length > 0) {
            throw new BadRequestException({
                message: 'La contraseña no cumple los requisitos',
                errores: reglasFallidas,
                tipo: 'requisitos',
            });
        }

        const resultado = (zxcvbn as any)(password);
        if (resultado.score < 2) {
            const sugerencias: string[] = [];
            if (resultado.feedback?.warning) {
                sugerencias.push(this.traducir(resultado.feedback.warning));
            }
            (resultado.feedback?.suggestions ?? []).forEach((s: string) => {
                sugerencias.push(this.traducir(s));
            });

            throw new BadRequestException({
                message: 'La contraseña es demasiado fácil de adivinar',
                errores: sugerencias.length > 0
                    ? sugerencias
                    : ['Usa una combinación más creativa. Evita palabras comunes, nombres o secuencias.'],
                tipo: 'diccionario',
            });
        }
    }

    obtenerEstadoReglas(password: string): { descripcion: string; cumplida: boolean }[] {
        return this.reglas.map((r) => ({
            descripcion: r.descripcion,
            cumplida: r.cumplida(password),
        }));
    }

    private traducir(texto: string): string {
        return this.traducciones[texto] ?? texto;
    }
}
