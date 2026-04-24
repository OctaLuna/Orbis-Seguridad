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
exports.MunicipiosService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const municipio_entity_1 = require("../entities/municipio.entity");
const typeorm_2 = require("typeorm");
let MunicipiosService = class MunicipiosService {
    muncipioRepository;
    constructor(muncipioRepository) {
        this.muncipioRepository = muncipioRepository;
    }
    create(createMunicipioDto) {
        return 'This action adds a new municipio';
    }
    async findManybyIds(ids) {
        const muncipios = await this.muncipioRepository.find({
            where: {
                id: (0, typeorm_2.In)(ids)
            }
        });
        return muncipios;
    }
    async findAll(options) {
        const municipios = await this.muncipioRepository.find({
            ...(options ? {
                where: {
                    ...(options.filters ? {
                        ...(options.filters.departamentos ? {
                            idDepartamento: (0, typeorm_2.In)(options.filters.departamentos)
                        } : {})
                    } : {})
                }
            } : {}),
            select: {
                id: true,
                nombreMunicipio: true,
                idDepartamento: true
            }
        });
        return municipios;
    }
    findOne(id) {
        return `This action returns a #${id} municipio`;
    }
    update(id, updateMunicipioDto) {
        return `This action updates a #${id} municipio`;
    }
    remove(id) {
        return `This action removes a #${id} municipio`;
    }
};
exports.MunicipiosService = MunicipiosService;
exports.MunicipiosService = MunicipiosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(municipio_entity_1.Municipio)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], MunicipiosService);
//# sourceMappingURL=municipios.service.js.map