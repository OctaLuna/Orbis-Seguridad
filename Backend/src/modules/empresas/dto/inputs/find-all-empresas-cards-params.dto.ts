import { Type, Transform } from "class-transformer";
import { IsOptional, IsString, IsNumber, Min } from "class-validator";
import { ApiPropertyOptional } from "@nestjs/swagger";
import { PaginationParamsDto } from "src/shared/dto/pagination-params.dto";
import { FindAllEmpresasCardsPublicParamsDto } from "./find-all-empresas-cards-public-params.dto";

export class FindAllEmpresasCardsParamsDto extends FindAllEmpresasCardsPublicParamsDto {
    @ApiPropertyOptional({
        description:
            'IDs de rubros separados por comas (ejemplo: "1,2,3"). Internamente se convierte a un array de números.',
        type: String,
        example: '1,2,3',
    })
    @IsOptional()
    @Transform(({ value }) => {
        if (!value) return [];
        return value
            .split(',')
            .map(v => Number(v.trim()))
            .filter(v => !isNaN(v));
    })
    rubros?: string;

    @ApiPropertyOptional({
        description:
            'IDs de departamentos separados por comas (ejemplo: "4,7"). Internamente se convierte a un array de números.',
        type: String,
        example: '4,7',
    })
    @IsOptional()
    @Transform(({ value }) => {
        if (!value) return [];
        return value
            .split(',')
            .map(v => Number(v.trim()))
            .filter(v => !isNaN(v));
    })
    departamentos?: string;

    @ApiPropertyOptional({
        description:
            'IDs de tipos societarios separados por comas (ejemplo: "2,5"). Internamente se convierte a un array de números.',
        type: String,
        example: '2,5',
    })
    @IsOptional()
    @Transform(({ value }) => {
        if (!value) return [];
        return value
            .split(',')
            .map(v => Number(v.trim()))
            .filter(v => !isNaN(v));
    })
    tiposSocietarios?: string;

    @ApiPropertyOptional({
        description:
            'Antigüedad mínima en años desde la fecha de fundación de la empresa.',
        type: String,
        example: '10',
    })
    @IsOptional()
    @Transform(({ value }) => Number(value))
    @IsNumber()
    antiguedad?: number;

    @ApiPropertyOptional({
        description:
            'Nombre del fundador (búsqueda exacta o parcial).',
        type: String,
        example: 'Juan Pérez',
    })
    @IsOptional()
    @IsString()
    fundador?: string;

    getRubros(): number[] {
        if (typeof this.rubros === 'string') {
            return this.rubros
                .split(',')
                .map(v => Number(v.trim()))
                .filter(v => !isNaN(v));
        }
        return Array.isArray(this.rubros) ? this.rubros : [];
    }

    getDepartamentos(): number[] {
        if (typeof this.departamentos === 'string') {
            return this.departamentos
                .split(',')
                .map(v => Number(v.trim()))
                .filter(v => !isNaN(v));
        }
        return Array.isArray(this.departamentos) ? this.departamentos : [];
    }

    getTiposSocietarios(): number[] {
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
