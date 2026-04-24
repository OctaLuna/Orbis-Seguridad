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
exports.TamaniosEmpresasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const tamanio_empresa_entity_1 = require("../entities/tamanio-empresa.entity");
const typeorm_2 = require("typeorm");
let TamaniosEmpresasService = class TamaniosEmpresasService {
    tamanioEmpresaRepository;
    constructor(tamanioEmpresaRepository) {
        this.tamanioEmpresaRepository = tamanioEmpresaRepository;
    }
    create(createTamaniosEmpresaDto) {
        return 'This action adds a new tamaniosEmpresa';
    }
    async findAll() {
        const tama = await this.tamanioEmpresaRepository.find({
            select: {
                id: true,
                nombre: true
            }
        });
        return tama;
    }
    async findOne(id, options = {}) {
        if (Number.isNaN(id) || id === 0) {
            throw new common_1.BadRequestException({
                message: 'Id de tamanio de empresa invalido'
            });
        }
        const tamanio = await this.tamanioEmpresaRepository.findOne({
            where: {
                id: id
            }
        });
        if (!tamanio && options.throwException) {
            throw new common_1.NotFoundException({
                message: 'No se encontro el tamanio de la empresa'
            });
        }
        return tamanio;
    }
    update(id, updateTamaniosEmpresaDto) {
        return `This action updates a #${id} tamaniosEmpresa`;
    }
    remove(id) {
        return `This action removes a #${id} tamaniosEmpresa`;
    }
};
exports.TamaniosEmpresasService = TamaniosEmpresasService;
exports.TamaniosEmpresasService = TamaniosEmpresasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(tamanio_empresa_entity_1.TamanioEmpresa)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TamaniosEmpresasService);
//# sourceMappingURL=tamanios-empresas.service.js.map