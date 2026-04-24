import { Empresa } from "../entities/empresa.entity";
import { FindOptionsRelations, FindOptionsSelect } from "typeorm";

export const EmpresaPublicTemplateSelect: FindOptionsSelect<Empresa> = {
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
}

export const EmpresaPublicTemplateRelations: FindOptionsRelations<Empresa> = {
    rubrosEmpresa: {
        rubro: true,
    },
    sedes: {
        departamento: true,
    },
    imagenes: true,
    hitos: true,
}