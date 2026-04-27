"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const typeorm_1 = require("typeorm");
const rol_entity_1 = require("../modules/roles/entities/rol.entity");
let Usuario = class Usuario {
    id;
    usuario;
    correo;
    correoReal;
    contrasenia;
    nombre;
    apellido;
    idRol;
    mustChangePassword;
    passwordChangedAt;
    passwordExpiresAt;
    isLocked;
    failedAttempts;
    lockedAt;
    accesoFormularioExterno;
    resetToken;
    resetTokenExpires;
    expiracion;
    createdAt;
    updatedAt;
    rol;
};
exports.Usuario = Usuario;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id_usuario' }),
    __metadata("design:type", Number)
], Usuario.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'usuario' }),
    __metadata("design:type", String)
], Usuario.prototype, "usuario", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'correo' }),
    __metadata("design:type", String)
], Usuario.prototype, "correo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'correo_real', nullable: true }),
    __metadata("design:type", String)
], Usuario.prototype, "correoReal", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'contrasenia' }),
    __metadata("design:type", String)
], Usuario.prototype, "contrasenia", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'nombre', nullable: true }),
    __metadata("design:type", String)
], Usuario.prototype, "nombre", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'apellido', nullable: true }),
    __metadata("design:type", String)
], Usuario.prototype, "apellido", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'id_rol' }),
    __metadata("design:type", Number)
], Usuario.prototype, "idRol", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'must_change_password', default: true }),
    __metadata("design:type", Boolean)
], Usuario.prototype, "mustChangePassword", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'password_changed_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Usuario.prototype, "passwordChangedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'password_expires_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Usuario.prototype, "passwordExpiresAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_locked', default: false }),
    __metadata("design:type", Boolean)
], Usuario.prototype, "isLocked", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'failed_attempts', default: 0 }),
    __metadata("design:type", Number)
], Usuario.prototype, "failedAttempts", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'locked_at', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Usuario.prototype, "lockedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'acceso_formulario_externo', default: false }),
    __metadata("design:type", Boolean)
], Usuario.prototype, "accesoFormularioExterno", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'reset_token', nullable: true }),
    __metadata("design:type", String)
], Usuario.prototype, "resetToken", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'reset_token_expires', type: 'timestamp', nullable: true }),
    __metadata("design:type", Date)
], Usuario.prototype, "resetTokenExpires", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'expiracion', type: 'timestamp without time zone', nullable: true }),
    __metadata("design:type", Date)
], Usuario.prototype, "expiracion", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Usuario.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Usuario.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => rol_entity_1.Rol, (rol) => rol.usuarios),
    (0, typeorm_1.JoinColumn)({ name: 'id_rol' }),
    __metadata("design:type", rol_entity_1.Rol)
], Usuario.prototype, "rol", void 0);
exports.Usuario = Usuario = __decorate([
    (0, typeorm_1.Entity)('usuarios')
], Usuario);
//# sourceMappingURL=usuario.entity.js.map