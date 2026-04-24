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
exports.FindAllEmpresasCardsParamsDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const find_all_empresas_cards_public_params_dto_1 = require("./find-all-empresas-cards-public-params.dto");
class FindAllEmpresasCardsParamsDto extends find_all_empresas_cards_public_params_dto_1.FindAllEmpresasCardsPublicParamsDto {
    rubros;
    departamentos;
    tiposSocietarios;
    antiguedad;
    fundador;
    getRubros() {
        if (typeof this.rubros === 'string') {
            return this.rubros
                .split(',')
                .map(v => Number(v.trim()))
                .filter(v => !isNaN(v));
        }
        return Array.isArray(this.rubros) ? this.rubros : [];
    }
    getDepartamentos() {
        if (typeof this.departamentos === 'string') {
            return this.departamentos
                .split(',')
                .map(v => Number(v.trim()))
                .filter(v => !isNaN(v));
        }
        return Array.isArray(this.departamentos) ? this.departamentos : [];
    }
    getTiposSocietarios() {
        if (typeof this.tiposSocietarios === 'string') {
            return this.tiposSocietarios
                .split(',')
                .map(v => Number(v.trim()))
                .filter(v => !isNaN(v));
        }
        return Array.isArray(this.tiposSocietarios) ? this.tiposSocietarios : [];
    }
    getAntiguedad() {
        return this.antiguedad;
    }
    getNombre() {
        return this.nombre;
    }
    getFundador() {
        return this.fundador || '';
    }
}
exports.FindAllEmpresasCardsParamsDto = FindAllEmpresasCardsParamsDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'IDs de rubros separados por comas (ejemplo: "1,2,3"). Internamente se convierte a un array de números.',
        type: String,
        example: '1,2,3',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (!value)
            return [];
        return value
            .split(',')
            .map(v => Number(v.trim()))
            .filter(v => !isNaN(v));
    }),
    __metadata("design:type", String)
], FindAllEmpresasCardsParamsDto.prototype, "rubros", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'IDs de departamentos separados por comas (ejemplo: "4,7"). Internamente se convierte a un array de números.',
        type: String,
        example: '4,7',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (!value)
            return [];
        return value
            .split(',')
            .map(v => Number(v.trim()))
            .filter(v => !isNaN(v));
    }),
    __metadata("design:type", String)
], FindAllEmpresasCardsParamsDto.prototype, "departamentos", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'IDs de tipos societarios separados por comas (ejemplo: "2,5"). Internamente se convierte a un array de números.',
        type: String,
        example: '2,5',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => {
        if (!value)
            return [];
        return value
            .split(',')
            .map(v => Number(v.trim()))
            .filter(v => !isNaN(v));
    }),
    __metadata("design:type", String)
], FindAllEmpresasCardsParamsDto.prototype, "tiposSocietarios", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Antigüedad mínima en años desde la fecha de fundación de la empresa.',
        type: String,
        example: '10',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => Number(value)),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], FindAllEmpresasCardsParamsDto.prototype, "antiguedad", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Nombre del fundador (búsqueda exacta o parcial).',
        type: String,
        example: 'Juan Pérez',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FindAllEmpresasCardsParamsDto.prototype, "fundador", void 0);
//# sourceMappingURL=find-all-empresas-cards-params.dto.js.map