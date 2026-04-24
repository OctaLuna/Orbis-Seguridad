"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmpresaPublicTemplateRelations = exports.EmpresaPublicTemplateSelect = void 0;
exports.EmpresaPublicTemplateSelect = {
    id: true,
    nombreComercial: true,
    mensaje: true,
    rubrosEmpresa: {
        id: true,
        rubro: {
            id: true,
            nombre: true,
        },
        esActivo: true,
    },
    sedes: {
        id: true,
        departamento: {
            id: true,
            nombre: true,
        },
        esCentral: true
    },
    imagenes: {
        id: true,
        url: true,
    },
    hitos: {
        id: true,
        nombre: true,
        fecha: true,
    },
};
exports.EmpresaPublicTemplateRelations = {
    rubrosEmpresa: {
        rubro: true,
    },
    sedes: {
        departamento: true,
    },
    imagenes: true,
    hitos: true,
};
//# sourceMappingURL=empresa-public.template.js.map