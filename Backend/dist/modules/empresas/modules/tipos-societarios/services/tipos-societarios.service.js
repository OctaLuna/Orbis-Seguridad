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
exports.TiposSocietariosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const tipo_societario_entity_1 = require("../entities/tipo-societario.entity");
const typeorm_2 = require("typeorm");
let TiposSocietariosService = class TiposSocietariosService {
    tipoSocietarioRepository;
    constructor(tipoSocietarioRepository) {
        this.tipoSocietarioRepository = tipoSocietarioRepository;
    }
    create(createTiposSocietarioDto) {
        return 'This action adds a new tiposSocietario';
    }
    async createTransaccion(manager, data) {
        console.log(data);
        const tiposSocietarios = data.map((tipoSoc) => ({
            nombre: tipoSoc.nombre,
            esPropio: true
        }));
        const result = await manager.getRepository(tipo_societario_entity_1.TipoSocietario).save(tiposSocietarios);
        return result.map((tp) => ({
            idTipsoc: tp.id,
            esActivo: data.find(t => t.nombre === tp.nombre).esActivo,
            fechaCambio: data.find(ti => ti.nombre === tp.nombre).fechaCambio
        }));
    }
    async findManyByIds(ids) {
        const rubros = await this.tipoSocietarioRepository.find({
            where: {
                id: (0, typeorm_2.In)(ids)
            }
        });
        const foundIds = rubros.map(r => r.id);
        const missingId = ids.find(id => !foundIds.includes(id));
        if (missingId !== undefined) {
            throw new common_1.NotFoundException(`El tipo de societario con id ${missingId} no fue encontrado`);
        }
        return rubros;
    }
    async findAll() {
        const tiposSocietarios = await this.tipoSocietarioRepository.find({
            where: {
                esPropio: false
            },
            select: {
                id: true,
                nombre: true,
            }
        });
        return tiposSocietarios;
    }
    findOne(id) {
        return `This action returns a #${id} tiposSocietario`;
    }
    update(id, updateTiposSocietarioDto) {
        return `This action updates a #${id} tiposSocietario`;
    }
    remove(id) {
        return `This action removes a #${id} tiposSocietario`;
    }
};
exports.TiposSocietariosService = TiposSocietariosService;
exports.TiposSocietariosService = TiposSocietariosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tipo_societario_entity_1.TipoSocietario)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TiposSocietariosService);
//# sourceMappingURL=tipos-societarios.service.js.map