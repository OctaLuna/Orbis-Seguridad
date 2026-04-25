/**
 * Genera un alias @orbis.com único a partir de nombre y apellido.
 * Normaliza caracteres especiales, elimina espacios, reemplaza por puntos.
 */
export function buildBaseAlias(nombre: string, apellido: string): string {
    const normalize = (str: string) =>
        str
            .toLowerCase()
            .trim()
            .normalize('NFD')
            .replace(/[̀-ͯ]/g, '')  // quitar tildes
            .replace(/\s+/g, '.')              // espacios → punto
            .replace(/[^a-z0-9.]/g, '');      // solo letras, números, puntos

    return `${normalize(nombre)}.${normalize(apellido)}`;
}
