"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordValidatorService = void 0;
const common_1 = require("@nestjs/common");
const zxcvbn = require("zxcvbn");
let PasswordValidatorService = class PasswordValidatorService {
    reglas = [
        {
            descripcion: 'Mínimo 12 caracteres',
            cumplida: (p) => p.length >= 12,
        },
        {
            descripcion: 'Al menos una letra mayúscula',
            cumplida: (p) => /[A-Z]/.test(p),
        },
        {
            descripcion: 'Al menos una letra minúscula',
            cumplida: (p) => /[a-z]/.test(p),
        },
        {
            descripcion: 'Al menos un número',
            cumplida: (p) => /\d/.test(p),
        },
        {
            descripcion: 'Al menos un carácter especial (!@#$%^&*...)',
            cumplida: (p) => /[^A-Za-z0-9]/.test(p),
        },
    ];
    validar(password) {
        const fallidas = this.reglas
            .filter((r) => !r.cumplida(password))
            .map((r) => r.descripcion);
        if (fallidas.length > 0) {
            throw new common_1.BadRequestException({
                message: 'La contraseña no cumple los requisitos de seguridad',
                errores: fallidas,
            });
        }
        const resultado = zxcvbn(password);
        if (resultado.score < 2) {
            throw new common_1.BadRequestException({
                message: 'La contraseña es demasiado predecible o común',
                sugerencia: resultado.feedback?.suggestions?.[0] ?? 'Usa una combinación más única',
            });
        }
    }
    obtenerEstadoReglas(password) {
        return this.reglas.map((r) => ({
            descripcion: r.descripcion,
            cumplida: r.cumplida(password),
        }));
    }
};
exports.PasswordValidatorService = PasswordValidatorService;
exports.PasswordValidatorService = PasswordValidatorService = __decorate([
    (0, common_1.Injectable)()
], PasswordValidatorService);
//# sourceMappingURL=password-validator.service.js.map