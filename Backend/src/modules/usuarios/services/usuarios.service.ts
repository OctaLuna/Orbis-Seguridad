import { BadRequestException, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from '../entities/usuario.entity';
import { DataSource, LessThanOrEqual, Repository, Not } from 'typeorm';
import { OptionsFindOne } from 'src/common/classes';
import { RolesEnum } from 'src/shared/constants/roles.const';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { addDays } from 'date-fns';
import { PasswordValidatorService } from 'src/common/services/password-validator.service';
import { PasswordHistoryService } from './password-history.service';
 
// (Asegúrate de que 'Not' esté importado de 'typeorm')

export class CambiarPasswordDto {
    @IsString() @IsOptional()
    passwordActual?: string;

    @IsString() @IsNotEmpty()
    passwordNuevo: string;
}

@Injectable()
export class UsuariosService {
    constructor(
        @InjectRepository(Usuario)
        private readonly usuarioRepository: Repository<Usuario>,
        private readonly passwordValidator: PasswordValidatorService,
        private readonly passwordHistoryService: PasswordHistoryService,
    ) { }
    
    create(createUsuarioDto: CreateUsuarioDto) {
        return 'This action adds a new usuario';
    }

    async findAll() {
        const usuario = await this.usuarioRepository.find({
            select: {
                id: true,
                usuario: true,
                nombre: true,
                apellido: true,
                correo: true,
                idRol: true,
                isLocked: true,
                failedAttempts: true,
                expiracion: true,
            },
            // 🔥 EL ESCUDO INVISIBLE AQUÍ 🔥
            where: {
                idRol: Not(1) // Esto le dice a la BD: "Tráeme todos, EXCEPTO los de rol 1"
            }
        });
        return usuario;
    }

    async findByUsuario(usuario: string, options?: OptionsFindOne) {

        const finalOptions = new OptionsFindOne();
        if (options) {
            Object.assign(finalOptions, options);
        }
        const repo = !finalOptions.manager ? this.usuarioRepository : finalOptions.manager!.getRepository(Usuario);
        const u = await repo.findOne({
            where: {
                usuario: usuario,
            },
        });
        if (!u && finalOptions.throwException) {
            throw new NotFoundException({
                message: 'Usuario no encontrado',
            });
        }
        return u;
    }

    async findOne(id: number, options?: OptionsFindOne) {
        const finalOptions = new OptionsFindOne();
        if (options) {
            Object.assign(finalOptions, options);
        }
        const repo = !finalOptions.manager ? this.usuarioRepository : finalOptions.manager!.getRepository(Usuario);
        const u = await repo.findOne({
            where: {
                id: id,
            },
        });
        if (!u) {
            if (finalOptions.throwException) {
                throw new NotFoundException({
                    message: 'Usuario no encontrado',
                });
            }
            return null;
        }
        if (
            u.idRol === RolesEnum.TEMPORAL &&
            u.expiracion &&
            u.expiracion.getTime() <= new Date().getTime()
        ) {
            if (finalOptions.throwException) {
                throw new NotFoundException({
                    message: 'Usuario no encontrado',
                });
            }
            return null;
        }
        return u;
    }

    async cambiarPassword(idUsuario: number, dto: CambiarPasswordDto): Promise<void> {
        const usuario = await this.usuarioRepository.findOneBy({ id: idUsuario });
        if (!usuario) throw new NotFoundException('Usuario no encontrado');

        // Verificar contraseña actual solo si NO es un cambio forzado
        if (!usuario.mustChangePassword) {
            if (!dto.passwordActual) {
                throw new BadRequestException('La contraseña actual es requerida');
            }
            const actualValida = await bcrypt.compare(dto.passwordActual, usuario.contrasenia);
            if (!actualValida) {
                throw new BadRequestException('La contraseña actual es incorrecta');
            }
        }

        this.passwordValidator.validar(dto.passwordNuevo);
        await this.passwordHistoryService.verificarReutilizacion(idUsuario, dto.passwordNuevo);

        const nuevoHash = await bcrypt.hash(dto.passwordNuevo, 12);
        await this.passwordHistoryService.guardarEnHistorial(idUsuario, nuevoHash);

        await this.usuarioRepository.update(idUsuario, {
            contrasenia:        nuevoHash,
            mustChangePassword: false,
            passwordChangedAt:  new Date(),
            passwordExpiresAt:  addDays(new Date(), 60),
            failedAttempts:     0,
            resetToken:         undefined,
            resetTokenExpires:  undefined,
        });
    }

    async restaurar(id: number): Promise<void> {
        await this.usuarioRepository.restore({ id });
    }

    async desbloquearCuenta(id: number): Promise<void> {
        await this.usuarioRepository.update(id, {
            isLocked: false,
            failedAttempts: 0,
            lockedAt: null as unknown as Date,
        });
    }

    async bloquearCuenta(id: number): Promise<void> {
        await this.usuarioRepository.update(id, {
            isLocked: true,
            lockedAt: new Date(),
        });
    }

    async incrementarIntentos(id: number, count: number): Promise<void> {
        await this.usuarioRepository.update(id, { failedAttempts: count });
    }

    async marcarPasswordExpirado(id: number): Promise<void> {
        await this.usuarioRepository.update(id, { mustChangePassword: true });
    }

    async findOneByCorreo(correo: string, options?: OptionsFindOne) {
        const finalOptions = new OptionsFindOne();
        if (options) {
            Object.assign(finalOptions, options);
        }
        const repo = !finalOptions.manager ? this.usuarioRepository : finalOptions.manager!.getRepository(Usuario);
        const u = await repo.findOne({
            where: {
                correo: correo,
            },
        });
        if (!u) {
            if (finalOptions.throwException) {
                throw new NotFoundException({
                    message: 'Usuario no encontrado',
                });
            }
            return null;
        }
        if (
            u.idRol === RolesEnum.TEMPORAL &&
            u.expiracion &&
            u.expiracion.getTime() <= new Date().getTime()
        ) {
            if (finalOptions.throwException) {
                throw new NotFoundException({
                    message: 'Usuario no encontrado',
                });
            }
            return null;
        }
        return u;
    }

    // --- M-07: Recuperación de contraseña ---

    async findByAnyEmail(email: string): Promise<Usuario | null> {
        const byReal = await this.usuarioRepository.findOne({ where: { correoReal: email } });
        if (byReal) return byReal;
        return this.usuarioRepository.findOne({ where: { correo: email } });
    }

    async guardarResetToken(id: number, tokenHash: string, expires: Date): Promise<void> {
        await this.usuarioRepository.update(id, {
            resetToken: tokenHash,
            resetTokenExpires: expires,
        });
    }

    async findByResetToken(tokenHash: string): Promise<Usuario | null> {
        return this.usuarioRepository.findOne({ where: { resetToken: tokenHash } });
    }

    async resetearPassword(id: number, passwordNuevo: string): Promise<void> {
        const usuario = await this.usuarioRepository.findOneBy({ id });
        if (!usuario) throw new NotFoundException('Usuario no encontrado');

        this.passwordValidator.validar(passwordNuevo);
        await this.passwordHistoryService.verificarReutilizacion(id, passwordNuevo);

        const nuevoHash = await bcrypt.hash(passwordNuevo, 12);
        await this.passwordHistoryService.guardarEnHistorial(id, nuevoHash);

        await this.usuarioRepository.update(id, {
            contrasenia:        nuevoHash,
            mustChangePassword: false,
            passwordChangedAt:  new Date(),
            passwordExpiresAt:  addDays(new Date(), 60),
            failedAttempts:     0,
            isLocked:           false,
            lockedAt:           null as unknown as Date,
            resetToken:         null as unknown as string,
            resetTokenExpires:  null as unknown as Date,
        });
    }

    // =========================================================
    // MAGIA PARA EL INVESTIGADOR JUNIOR (RUBROS)
    // =========================================================
    // =========================================================
    // LÓGICA REAL PARA EL INVESTIGADOR JUNIOR (RUBROS)
    // =========================================================
    async obtenerRubrosPorUsuario(idUsuario: number): Promise<string[]> {
        console.log(`Buscando rubros permitidos en BD para el usuario ID: ${idUsuario}`);

        try {
            // Ejecutamos una consulta SQL pura uniendo la tabla puente con el catálogo.
            // Usamos las columnas exactas de tu pgAdmin4.
            const resultados = await this.usuarioRepository.query(
                `
                SELECT r.nombre_rubro
                FROM investigador_rubro ir
                INNER JOIN rubros r ON ir.id_rubro = r.id_rubro
                WHERE ir.id_usuario = $1
                `,
                [idUsuario] // El $1 se reemplaza de forma segura por el idUsuario
            );

            // La base de datos nos devuelve un arreglo de objetos: [{ nombre_rubro: 'Salud' }, ...]
            // Lo mapeamos para sacar solo los textos y devolver: ['Salud', ...]
            const rubrosPermitidos = resultados.map((fila: any) => fila.nombre_rubro);
            
            console.log(`Rubros encontrados para usuario ${idUsuario}:`, rubrosPermitidos);
            
            return rubrosPermitidos;

        } catch (error) {
            console.error('Error en BD al obtener rubros del investigador:', error);
            return []; // Por seguridad, si falla la BD, no le damos acceso a nada.
        }
    }
}