import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmpresaDto } from '../dto/inputs/create-empresa.dto';
import { UpdateEmpresaDto } from '../dto/inputs/update-empresa.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Empresa } from '../entities/empresa.entity';
import { EntityManager, FindOptionsRelations, FindOptionsSelect, Repository } from 'typeorm';
import { FindAllEmpresasCardsParamsDto } from '../dto/inputs/find-all-empresas-cards-params.dto';
import { FindAllEmpresasCardsPaginationResponseDto } from '../dto/outputs/find-all-empresas-cards-pagination-response.dto';
import { EmpresaPublicTemplateRelations, EmpresaPublicTemplateSelect } from '../find-templates/empresa-public.template';
import { EmpresaNotFoundException } from '../exceptions/empresa-not-found.exception';
import { EmpresaPrivateTemplateRelations, EmpresaPrivateTemplateSelect } from '../find-templates/empresa-private.template';
import { FindAllEmpresasCardsPublicParamsDto } from '../dto/inputs/find-all-empresas-cards-public-params.dto';
import { InvestigadorEmpresa } from 'src/modules/usuarios/entities/investigador-empresa.entity';

@Injectable()
export class EmpresasService {
	constructor(
		@InjectRepository(Empresa)
		private readonly empresaRepository: Repository<Empresa>,
		@InjectRepository(InvestigadorEmpresa)
		private readonly investigadorEmpresaRepository: Repository<InvestigadorEmpresa>,
	) { }
	create(createEmpresaDto: CreateEmpresaDto) {
		return 'This action adds a new empresa';
	}

	async createTransaction(manager: EntityManager, data: CreateEmpresaDto) {
		const repo = manager.getRepository(Empresa);
		const empresa = new Empresa();

		// Para los strings: verifica si existen antes de hacer .trim(), si no, asigna un string vacío.
		empresa.nombreComercial = data.nombre ? data.nombre.trim() : '';
		empresa.vision = data.vision ? data.vision.trim() : '';
		empresa.mision = data.mision ? data.mision.trim() : '';
		empresa.direccionWeb = data.direccionWeb ? data.direccionWeb.trim() : '';
		empresa.mensaje = data.mensajeConmemorativo ? data.mensajeConmemorativo.trim() : '';
		empresa.actividad = data.actividad ? data.actividad.trim() : '';

		// Para la fecha: simplemente asígnala. La base de datos aceptará el valor `null` sin problemas.
		// ¡NUNCA se debe hacer .trim() a una fecha!
		empresa.fechaFundacion = data.fechaFundacion;

		// Para los IDs:
		empresa.idTamanio = data.tamanioEmpresa;

		return await repo.save(empresa);
	}

	async findAll() {
		const empresas = await this.empresaRepository.find({
			relations: {
				sedes: {
					departamento: true
				},
				familias: true,
				fundadores: true,
				hitos: true,
				imagenes: true,
				implementacion: {
					tiposAcciones: true,
					implementacionesAcciones: {
						accion: true,
						proyectos: true
					}
				},
				items: true,
				municipios: true,
				paisesOperaInteranacionalmente: true,
				premios: true,
				rubrosEmpresa: {
					rubro: true
				},
				servicios: true,
				tamanioEmpresa: true,
				tiposSocietariosEmpresa: {
					tipoSocietario: true
				}
			},
		})
		return empresas;
	}

	async findAllCardsPrivate(params: FindAllEmpresasCardsParamsDto, idUsuario?: number) {
        const query = this.empresaRepository
            .createQueryBuilder('empresa')
            .leftJoinAndSelect('empresa.imagenes', 'imagen')
            .leftJoinAndSelect('empresa.hitos', 'hito')
            .leftJoin('empresa.sedes', 'sedeCentral', 'sedeCentral.esCentral = true')
            .leftJoin('sedeCentral.departamento', 'departamento')
            .leftJoin('empresa.rubrosEmpresa', 'rubroEmpresa')
            .leftJoinAndSelect('rubroEmpresa.rubro', 'rubro')
            .leftJoin('empresa.tiposSocietariosEmpresa', 'tipoEmpSoc')
            .leftJoin('tipoEmpSoc.tipoSocietario', 'tipoSocietario')
            .leftJoin('empresa.fundadores', 'fundador');

        // =========================================================
        // EL BUG DE OCTAVIO ARREGLADO:
        // Filtramos usando la tabla puente real (investigador_rubro)
        // =========================================================
        if (idUsuario) {
            query.innerJoin(
                'investigador_rubro', // <--- LA TABLA CORRECTA QUE VIMOS EN PGADMIN
                'ir',
                'ir.id_rubro = rubro.id AND ir.id_usuario = :idUsuario',
                { idUsuario },
            );
        }

        query
            .select([
                'empresa.id',
                'empresa.nombreComercial',
                'imagen.id',
                'imagen.url',
                'hito.id',
                'hito.nombre',
                'hito.fecha',
                'sedeCentral.id',
                'sedeCentral.esCentral',
                'departamento.id',
                'departamento.nombre',
                'rubroEmpresa.id',
                'rubro.id',
                'rubro.nombre',
            ]);

        const rubros = params.getRubros();
        if (rubros.length > 0) query.andWhere('rubro.id IN (:...rubros)', { rubros });

        const departamentos = params.getDepartamentos();
        if (departamentos.length > 0)
            query.andWhere('departamento.id IN (:...departamentos)', { departamentos });

        const tiposSocietarios = params.getTiposSocietarios();
        if (tiposSocietarios.length > 0)
            query.andWhere('tipoSocietario.id IN (:...tiposSocietarios)', { tiposSocietarios });

        const antiguedad = params.getAntiguedad();
        if (antiguedad)
            query.andWhere('EXTRACT(YEAR FROM empresa.fechaFundacion) <= :antiguedad', { antiguedad });

        const nombre = params.getNombre();
        if (nombre && nombre.trim() !== '') {
            query.andWhere('LOWER(empresa.nombreComercial) LIKE LOWER(:nombre)', {
                nombre: `%${nombre.trim()}%`,
            });
        }

        const fundador = params.getFundador();
        if (fundador && fundador.trim() !== '') {
            query.andWhere('LOWER(fundador.nombre) LIKE LOWER(:fundador)', {
                fundador: `%${fundador.trim()}%`,
            });
        }

        const page = params.page;
        const limit = params.limit;
        const skip = (page - 1) * limit;

        query.orderBy('empresa.nombreComercial', 'ASC')
            .skip(skip)
            .take(limit);

        const [empresas, total] = await query.getManyAndCount();
        const pages = Math.ceil(total / limit);

        const data = empresas.map((empresa) => {
            const sede = (empresa as any).sedes?.[0];
            const depa = sede?.departamento;

            return {
                id: empresa.id,
                nombreComercial: empresa.nombreComercial,
                imagenes: empresa.imagenes?.map((img) => ({
                    id: img.id,
                    url: img.url,
                })) || [],
                hitos: empresa.hitos?.map((h) => ({
                    id: h.id,
                    nombre: h.nombre,
                    fecha: h.fecha,
                })) || [],
                sedeCentral: {
                    id: depa?.id,
                    nombre: depa?.nombre,
                },
                rubros: empresa.rubrosEmpresa?.map((r) => ({
                    id: r.rubro?.id,
                    nombre: r.rubro?.nombre,
                })) || [],
            };
        });

        const response = new FindAllEmpresasCardsPaginationResponseDto();
        response.data = data;
        response.page = page;
        response.limit = limit;
        response.total = total;
        response.pages = pages;

        return response;
    }


	async findAllCardsPublic(params: FindAllEmpresasCardsPublicParamsDto) {
		const query = this.empresaRepository
			.createQueryBuilder('empresa')
			.leftJoinAndSelect('empresa.imagenes', 'imagen')
			.leftJoinAndSelect('empresa.hitos', 'hito')
			.leftJoinAndSelect('empresa.rubrosEmpresa', 'rubroEmpresa')
			.leftJoinAndSelect('rubroEmpresa.rubro', 'rubro')
			.leftJoinAndSelect(
				'empresa.sedes',
				'sedeCentral',
				'sedeCentral.esCentral = true'
			)
			.leftJoinAndSelect('sedeCentral.departamento', 'departamento')
			.select([
				'empresa.id',
				'empresa.nombreComercial',
				'imagen.id',
				'imagen.url',
				'hito.id',
				'hito.nombre',
				'hito.fecha',
				'sedeCentral.id',
				'sedeCentral.esCentral',
				'departamento.id',
				'departamento.nombre',
				'rubroEmpresa.id',
				'rubro.id',
				'rubro.nombre',
			]);

		if (params.nombre && params.nombre.trim() !== '') {
			query.andWhere('LOWER(empresa.nombreComercial) LIKE LOWER(:nombre)', {
				nombre: `%${params.nombre.trim()}%`,
			});
		}

		const page = params.page;
		const limit = params.limit;
		const skip = (page - 1) * limit;

		query.orderBy('empresa.nombreComercial', 'ASC')
			.skip(skip)
			.take(limit);

		const [empresas, total] = await query.getManyAndCount();
		const pages = Math.ceil(total / limit);

		const data = empresas.map((empresa) => {
			const sede = empresa.sedes?.[0];
			const depa = sede?.departamento;

			return {
				id: empresa.id,
				nombreComercial: empresa.nombreComercial,
				imagenes: empresa.imagenes?.map((img) => ({
					id: img.id,
					url: img.url,
				})) || [],
				hitos: empresa.hitos?.map((h) => ({
					id: h.id,
					nombre: h.nombre,
					fecha: h.fecha,
				})) || [],
				sedeCentral: {
					id: depa?.id,
					nombre: depa?.nombre,
				},
				rubros: empresa.rubrosEmpresa?.map((r) => ({
						id: r.rubro?.id,
						nombre: r.rubro?.nombre,
					})) || [],
			};
		});

		const response = new FindAllEmpresasCardsPaginationResponseDto();
		response.data = data;
		response.page = page;
		response.limit = limit;
		response.total = total;
		response.pages = pages;

		return response;
	}


	async findOne(idEmpresa: number, selectOptions?: FindOptionsSelect<Empresa>, relationsOptions?: FindOptionsRelations<Empresa>) {
		const empresa = await this.empresaRepository.findOne({
			where: {
				id: idEmpresa,
			},
			relations: relationsOptions,
			select: selectOptions,
		})
		if (!empresa) {
			throw new EmpresaNotFoundException(idEmpresa);
		}
		return empresa;
	}

	async findOnePublic(idEmpresa: number) {
		const data = await this.findOne(idEmpresa, EmpresaPublicTemplateSelect, EmpresaPublicTemplateRelations);
		const empresa = {
			id: data.id,
			nombreComercial: data.nombreComercial,
			mensaje: data.mensaje,
			rubrosEmpresa: data.rubrosEmpresa?.map(r => ({
				rubro: r.rubro,
				esActivo: r.esActivo
			})),
			departamento: data.sedes?.find(s => s.esCentral === true)?.departamento,
			imagenes: data.imagenes?.map(i => i.url),
			hitos: data.hitos,
		}
		return empresa;
	}

	async findOnePrivate(idEmpresa: number, idUsuario?: number) {
		if (idUsuario) {
			const asignado = await this.investigadorEmpresaRepository.existsBy({ idUsuario, idEmpresa });
			if (!asignado) throw new EmpresaNotFoundException(idEmpresa);
		}
		const data = await this.findOne(idEmpresa, EmpresaPrivateTemplateSelect, EmpresaPrivateTemplateRelations);
		return data;
	}

	// =========================================================
    // MÉTODOS PARA EDITAR Y ELIMINAR (DEFINITIVOS TYPEORM)
    // =========================================================

    async updateEmpresa(idEmpresa: number, data: any) {
        // 1. Verificamos que la empresa exista (si no, lanza el EmpresaNotFoundException)
        await this.findOne(idEmpresa);

        // 2. Filtramos solo los campos principales que se pueden actualizar directo en la tabla
        // (Actualizar relaciones/arrays requiere borrar e insertar en tablas pivot, por ahora blindamos los textos)
        const camposBasicos: any = {};
        
        if (data.nombreComercial !== undefined) camposBasicos.nombreComercial = data.nombreComercial;
        if (data.vision !== undefined) camposBasicos.vision = data.vision;
        if (data.mision !== undefined) camposBasicos.mision = data.mision;
        if (data.actividad !== undefined) camposBasicos.actividad = data.actividad;
        if (data.direccionWeb !== undefined) camposBasicos.direccionWeb = data.direccionWeb;
        if (data.mensaje !== undefined) camposBasicos.mensaje = data.mensaje;

        // 3. Si hay campos básicos que actualizar, le decimos a TypeORM que haga el UPDATE
        if (Object.keys(camposBasicos).length > 0) {
            await this.empresaRepository.update(idEmpresa, camposBasicos);
        }

        // 4. Retornamos la empresa actualizada fresca desde la base de datos
        return await this.findOnePrivate(idEmpresa);
    }

    async deleteEmpresa(idEmpresa: number) {
        // 1. Verificamos que exista
        await this.findOne(idEmpresa);

        // 2. Usamos el QueryRunner/Manager para borrar en cadena
        await this.empresaRepository.manager.transaction(async (transactionManager) => {
            
            // --- FASE 0: LIMPIEZA DE DEPENDENCIAS DE 3ER NIVEL (Bisnietos) ---
            await transactionManager.query(
                `DELETE FROM "proyectos" 
                 WHERE "id_implementacion_accion" IN (
                    SELECT "id_implementacion_accion" FROM "implementaciones_acciones" 
                    WHERE "id_implementacion" IN (
                        SELECT "id_implementacion" FROM "implementaciones" WHERE "id_empresa" = $1
                    )
                 )`, 
                [idEmpresa]
            );

            // --- FASE 1: LIMPIEZA DE DEPENDENCIAS DE 2DO NIVEL (Nietos) ---
            await transactionManager.query(
                `DELETE FROM "tipos_acciones_implementaciones" 
                 WHERE "id_implementacion" IN (
                    SELECT "id_implementacion" FROM "implementaciones" WHERE "id_empresa" = $1
                 )`, 
                [idEmpresa]
            );

            await transactionManager.query(
                `DELETE FROM "implementaciones_acciones" 
                 WHERE "id_implementacion" IN (
                    SELECT "id_implementacion" FROM "implementaciones" WHERE "id_empresa" = $1
                 )`, 
                [idEmpresa]
            );

            // --- FASE 2: LIMPIEZA DE DEPENDENCIAS PRINCIPALES (Hijos) ---
            
            // Los que ya confirmamos que estorban:
            await transactionManager.query(`DELETE FROM "municipios_empresas" WHERE "id_empresa" = $1`, [idEmpresa]);
            await transactionManager.query(`DELETE FROM "premios" WHERE "id_empresa" = $1`, [idEmpresa]);
            await transactionManager.query(`DELETE FROM "implementaciones" WHERE "id_empresa" = $1`, [idEmpresa]);
            await transactionManager.query(`DELETE FROM "familias" WHERE "id_empresa" = $1`, [idEmpresa]);
            
            // Ataque preventivo: Barremos con todos los demás hijos directos por si acaso
            await transactionManager.query(`DELETE FROM "fundadores" WHERE "id_empresa" = $1`, [idEmpresa]);
            await transactionManager.query(`DELETE FROM "hitos" WHERE "id_empresa" = $1`, [idEmpresa]);
            await transactionManager.query(`DELETE FROM "imagenes" WHERE "id_empresa" = $1`, [idEmpresa]);
            await transactionManager.query(`DELETE FROM "sedes" WHERE "id_empresa" = $1`, [idEmpresa]);
            //await transactionManager.query(`DELETE FROM "rubros_empresa" WHERE "id_empresa" = $1`, [idEmpresa]);
            //await transactionManager.query(`DELETE FROM "tipos_societarios_empresa" WHERE "id_empresa" = $1`, [idEmpresa]);
            await transactionManager.query(`DELETE FROM "items" WHERE "id_empresa" = $1`, [idEmpresa]);
            await transactionManager.query(`DELETE FROM "servicios" WHERE "id_empresa" = $1`, [idEmpresa]);
            await transactionManager.query(`DELETE FROM "investigador_empresa" WHERE "id_empresa" = $1`, [idEmpresa]);

            // --- FASE 3: ELIMINACIÓN FINAL (Jefe) ---
            await transactionManager.query(
                `DELETE FROM "empresas" WHERE "id_empresa" = $1`, 
                [idEmpresa]
            );
        });

        return true;
    }
}
