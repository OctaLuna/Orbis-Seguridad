export declare class PermisosAdminDto {
    panelUsuarios: boolean;
    editarEmpresas: boolean;
    formularioExterno: boolean;
}
export declare class CreateUsuarioNuevoDto {
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno?: string;
    correoReal: string;
    tipoRol: 'admin' | 'investigador';
    permisos?: PermisosAdminDto;
    rubrosAsignados?: number[];
}
