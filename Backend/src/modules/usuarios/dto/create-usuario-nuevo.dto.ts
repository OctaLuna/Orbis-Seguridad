import {
    IsString, IsEmail, IsNotEmpty, IsOptional,
    IsIn, IsArray, IsInt, IsBoolean, ValidateIf, ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class PermisosAdminDto {
    @IsBoolean()
    panelUsuarios: boolean;

    @IsBoolean()
    editarEmpresas: boolean;

    @IsBoolean()
    formularioExterno: boolean;
}

export class CreateUsuarioNuevoDto {
    @ApiProperty({ example: 'Octavio' })
    @IsString()
    @IsNotEmpty()
    nombre: string;

    @ApiProperty({ example: 'Luna' })
    @IsString()
    @IsNotEmpty()
    apellidoPaterno: string;

    @ApiPropertyOptional({ example: 'García' })
    @IsString()
    @IsOptional()
    apellidoMaterno?: string;

    @ApiProperty({ example: 'octavio.personal@gmail.com' })
    @IsEmail()
    correoReal: string;

    @ApiProperty({ enum: ['admin', 'investigador'] })
    @IsIn(['admin', 'investigador'])
    tipoRol: 'admin' | 'investigador';

    @ValidateIf((o) => o.tipoRol === 'admin')
    @ValidateNested()
    @Type(() => PermisosAdminDto)
    @ApiPropertyOptional({ type: PermisosAdminDto })
    permisos?: PermisosAdminDto;

    @ValidateIf((o) => o.tipoRol === 'investigador')
    @IsArray()
    @IsInt({ each: true })
    @IsOptional()
    @ApiPropertyOptional({ type: [Number] })
    rubrosAsignados?: number[];
}
