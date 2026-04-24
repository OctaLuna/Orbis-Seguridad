import { number, string } from "joi";
import { Empresa } from "../entities/empresa.entity";
import { FindOptionsRelations, FindOptionsSelect } from "typeorm";

export const EmpresaPrivateTemplateSelect: FindOptionsSelect<Empresa> = {
    id: true,
    nombreComercial: true,
    fechaFundacion: true,
    vision: true,
    mision: true,
    direccionWeb: true,
    tamanioEmpresa: {
        id: true,
        nombre: true,
    },
    mensaje: true,
    actividad: true,
    rubrosEmpresa: {
        id: true,
        rubro: {
            id: true,
            nombre: true,
            esPropio: true
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
    municipios: {
        id: true,
        nombreMunicipio: true,
    },
    servicios: {
        id: true,
        nombre: true,
    },
    items: {
        id: true,
        nombre: true,
    },
    tiposSocietariosEmpresa: {
        id: true,
        tipoSocietario: {
            id: true,
            nombre: true,
            esPropio: true,
        },
        esActivo: true,
        fechaCambio: true,
    },
    hitos: {
        id: true,
        nombre: true,
        fecha: true,
    },
    premios: {
        id: true,
        nombre: true,
        esPremio: true,
        esNacional: true,
    },
    familias: {
        id: true,
        esFamiliar: true,
        anio: true
    },

    paisesOperaInteranacionalmente: {
        id: true,
        nombre: true
    },

    fundadores: {
        id: true,
        nombre: true
    },

    imagenes: {
        id: true,
        url: true,
    },
    
    implementacion: {
        id: true,
        anio: true,
        implementacionesAcciones: {
            id: true,
            accion: {
                id: true,
                nombre: true
            },
            proyectos: {
                id: true,
                nombre: true
            },
        },
        tiposAcciones: {
            id: true,
            nombre: true
        }
    }
}

export const EmpresaPrivateTemplateRelations: FindOptionsRelations<Empresa> = {
    tamanioEmpresa: true,
    rubrosEmpresa: {
        rubro: true,
    },
    sedes: {
        departamento: true,
    },
    municipios: true,
    servicios: true,
    items: true,
    tiposSocietariosEmpresa: {
        tipoSocietario: true,
    },
    hitos: true,
    premios: true,
    familias: true,
    paisesOperaInteranacionalmente: true,

    fundadores: true,

    imagenes: true,
    implementacion: {
        implementacionesAcciones: {
            accion: true,
            proyectos: true
        },
        tiposAcciones: true
    }
    
}