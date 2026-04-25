"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROLES_CON_LECTURA = exports.ROLES_INVESTIGADORES = exports.ROLES_ADMIN = exports.Rol = exports.RolesEnum = void 0;
var RolesEnum;
(function (RolesEnum) {
    RolesEnum[RolesEnum["SUPERADMIN"] = 1] = "SUPERADMIN";
    RolesEnum[RolesEnum["ADMIN"] = 2] = "ADMIN";
    RolesEnum[RolesEnum["INVESTIGADOR"] = 3] = "INVESTIGADOR";
    RolesEnum[RolesEnum["TEMPORAL"] = 4] = "TEMPORAL";
    RolesEnum[RolesEnum["VISITANTE"] = 5] = "VISITANTE";
})(RolesEnum || (exports.RolesEnum = RolesEnum = {}));
var Rol;
(function (Rol) {
    Rol[Rol["SUPERADMIN"] = 1] = "SUPERADMIN";
    Rol[Rol["ADMIN_RRHH"] = 2] = "ADMIN_RRHH";
    Rol[Rol["ADMIN_EMPRESAS"] = 3] = "ADMIN_EMPRESAS";
    Rol[Rol["INVESTIGADOR_SENIOR"] = 4] = "INVESTIGADOR_SENIOR";
    Rol[Rol["INVESTIGADOR_JUNIOR"] = 5] = "INVESTIGADOR_JUNIOR";
    Rol[Rol["TEMPORAL"] = 6] = "TEMPORAL";
    Rol[Rol["VISITANTE"] = 7] = "VISITANTE";
})(Rol || (exports.Rol = Rol = {}));
exports.ROLES_ADMIN = [Rol.SUPERADMIN, Rol.ADMIN_RRHH, Rol.ADMIN_EMPRESAS];
exports.ROLES_INVESTIGADORES = [Rol.INVESTIGADOR_SENIOR, Rol.INVESTIGADOR_JUNIOR];
exports.ROLES_CON_LECTURA = [
    Rol.SUPERADMIN,
    Rol.ADMIN_RRHH,
    Rol.ADMIN_EMPRESAS,
    Rol.INVESTIGADOR_SENIOR,
    Rol.INVESTIGADOR_JUNIOR,
];
//# sourceMappingURL=roles.const.js.map