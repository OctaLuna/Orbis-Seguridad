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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmpresasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const empresa_entity_1 = require("../entities/empresa.entity");
const typeorm_2 = require("typeorm");
const find_all_empresas_cards_pagination_response_dto_1 = require("../dto/outputs/find-all-empresas-cards-pagination-response.dto");
const empresa_public_template_1 = require("../find-templates/empresa-public.template");
const empresa_not_found_exception_1 = require("../exceptions/empresa-not-found.exception");
const empresa_private_template_1 = require("../find-templates/empresa-private.template");
const investigador_empresa_entity_1 = require("../../usuarios/entities/investigador-empresa.entity");
let EmpresasService = class EmpresasService {
    empresaRepository;
    investigadorEmpresaRepository;
    constructor(empresaRepository, investigadorEmpresaRepository) {
        this.empresaRepository = empresaRepository;
        this.investigadorEmpresaRepository = investigadorEmpresaRepository;
    }
    create(createEmpresaDto) {
        return 'This action adds a new empresa';
    }
    async createTransaction(manager, data) {
        const repo = manager.getRepository(empresa_entity_1.Empresa);
        const empresa = new empresa_entity_1.Empresa();
        empresa.nombreComercial = data.nombre ? data.nombre.trim() : '';
        empresa.vision = data.vision ? data.vision.trim() : '';
        empresa.mision = data.mision ? data.mision.trim() : '';
        empresa.direccionWeb = data.direccionWeb ? data.direccionWeb.trim() : '';
        empresa.mensaje = data.mensajeConmemorativo ? data.mensajeConmemorativo.trim() : '';
        empresa.actividad = data.actividad ? data.actividad.trim() : '';
        empresa.fechaFundacion = data.fechaFundacion;
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
        });
        return empresas;
    }
    async findAllCardsPrivate(params, idUsuario) {
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
        if (idUsuario) {
            query.innerJoin('investigador_empresa', 'ie', 'ie.id_empresa = empresa.id AND ie.id_usuario = :idUsuario', { idUsuario });
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
        if (rubros.length > 0)
            query.andWhere('rubro.id IN (:...rubros)', { rubros });
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
        const response = new find_all_empresas_cards_pagination_response_dto_1.FindAllEmpresasCardsPaginationResponseDto();
        response.data = data;
        response.page = page;
        response.limit = limit;
        response.total = total;
        response.pages = pages;
        return response;
    }
    async findAllCardsPublic(params) {
        const query = this.empresaRepository
            .createQueryBuilder('empresa')
            .leftJoinAndSelect('empresa.imagenes', 'imagen')
            .leftJoinAndSelect('empresa.hitos', 'hito')
            .leftJoinAndSelect('empresa.rubrosEmpresa', 'rubroEmpresa')
            .leftJoinAndSelect('rubroEmpresa.rubro', 'rubro')
            .leftJoinAndSelect('empresa.sedes', 'sedeCentral', 'sedeCentral.esCentral = true')
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
        const response = new find_all_empresas_cards_pagination_response_dto_1.FindAllEmpresasCardsPaginationResponseDto();
        response.data = data;
        response.page = page;
        response.limit = limit;
        response.total = total;
        response.pages = pages;
        return response;
    }
    async findOne(idEmpresa, selectOptions, relationsOptions) {
        const empresa = await this.empresaRepository.findOne({
            where: {
                id: idEmpresa,
            },
            relations: relationsOptions,
            select: selectOptions,
        });
        if (!empresa) {
            throw new empresa_not_found_exception_1.EmpresaNotFoundException(idEmpresa);
        }
        return empresa;
    }
    async findOnePublic(idEmpresa) {
        const data = await this.findOne(idEmpresa, empresa_public_template_1.EmpresaPublicTemplateSelect, empresa_public_template_1.EmpresaPublicTemplateRelations);
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
        };
        return empresa;
    }
    async findOnePrivate(idEmpresa, idUsuario) {
        if (idUsuario) {
            const asignado = await this.investigadorEmpresaRepository.existsBy({ idUsuario, idEmpresa });
            if (!asignado)
                throw new empresa_not_found_exception_1.EmpresaNotFoundException(idEmpresa);
        }
        const data = await this.findOne(idEmpresa, empresa_private_template_1.EmpresaPrivateTemplateSelect, empresa_private_template_1.EmpresaPrivateTemplateRelations);
        return data;
    }
};
exports.EmpresasService = EmpresasService;
exports.EmpresasService = EmpresasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(empresa_entity_1.Empresa)),
    __param(1, (0, typeorm_1.InjectRepository)(investigador_empresa_entity_1.InvestigadorEmpresa)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], EmpresasService);
//# sourceMappingURL=empresas.service.js.map