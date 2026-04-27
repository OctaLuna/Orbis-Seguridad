/**
 * Genera el alias base a partir de nombre y apellido paterno.
 * El apellido materno NO se incluye en el alias.
 *
 * Ejemplo: buildBaseAlias('Octavio', 'Luna')      → 'octavio.luna'
 * Ejemplo: buildBaseAlias('María José', 'Pérez') → 'maria.jose.perez'
 */
export function buildBaseAlias(nombre: string, apellidoPaterno: string): string {
    const normalizar = (str: string): string =>
        str
            .toLowerCase()
            .trim()
            .normalize('NFD')
            .replace(/[̀-ͯ]/g, '')
            .replace(/\s+/g, '.')
            .replace(/[^a-z0-9.]/g, '');

    return `${normalizar(nombre)}.${normalizar(apellidoPaterno)}`;
}
