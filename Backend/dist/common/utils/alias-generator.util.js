"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildBaseAlias = buildBaseAlias;
function buildBaseAlias(nombre, apellido) {
    const normalize = (str) => str
        .toLowerCase()
        .trim()
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .replace(/\s+/g, '.')
        .replace(/[^a-z0-9.]/g, '');
    return `${normalize(nombre)}.${normalize(apellido)}`;
}
//# sourceMappingURL=alias-generator.util.js.map