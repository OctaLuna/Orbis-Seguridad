// Alias del enum principal — mantenido para compatibilidad con código existente
export enum RolesEnum {
    SUPERADMIN          = 1,
    ADMIN_RRHH          = 2,
    ADMIN_EMPRESAS      = 3,
    INVESTIGADOR_SENIOR = 4,
    INVESTIGADOR_JUNIOR = 5,
    TEMPORAL            = 6,
    VISITANTE           = 7,
}

// Nuevo enum con roles segregados (M-02 / M-08)
export enum Rol {
    SUPERADMIN          = 1,
    ADMIN_RRHH          = 2,
    ADMIN_EMPRESAS      = 3,
    INVESTIGADOR_SENIOR = 4,
    INVESTIGADOR_JUNIOR = 5,
    TEMPORAL            = 6,
    VISITANTE           = 7,
}

// Agrupaciones útiles para guards
export const ROLES_ADMIN          = [Rol.SUPERADMIN, Rol.ADMIN_RRHH, Rol.ADMIN_EMPRESAS];
export const ROLES_ADMIN_SISTEMA  = [Rol.SUPERADMIN, Rol.ADMIN_RRHH];
export const ROLES_ADMIN_EMPRESAS = [Rol.SUPERADMIN, Rol.ADMIN_EMPRESAS];
export const ROLES_INVESTIGADORES = [Rol.INVESTIGADOR_SENIOR, Rol.INVESTIGADOR_JUNIOR];
export const ROLES_CON_LECTURA    = [
    Rol.SUPERADMIN,
    Rol.ADMIN_RRHH,
    Rol.ADMIN_EMPRESAS,
    Rol.INVESTIGADOR_SENIOR,
    Rol.INVESTIGADOR_JUNIOR,
];
