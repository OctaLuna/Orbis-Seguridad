"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildBaseAlias = buildBaseAlias;
function buildBaseAlias(nombre, apellidoPaterno) {
    const normalizar = (str) => str
        .toLowerCase()
        .trim()
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .replace(/\s+/g, '.')
        .replace(/[^a-z0-9.]/g, '');
    return `${normalizar(nombre)}.${normalizar(apellidoPaterno)}`;
}
//# sourceMappingURL=alias-generator.util.js.map