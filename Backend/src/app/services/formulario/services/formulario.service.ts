import { Injectable } from "@nestjs/common";
import { TamaniosEmpresasService } from "src/modules/empresas/modules/tamanios-empresas/services/tamanios-empresas.service";
import { DataSource } from "typeorm";
import { RegisterEmpresaDto } from "../dto/register-empresa.dto";
import { EmpresasService } from "src/modules/empresas/services/empresas.service";
import { FundadoresService } from "src/modules/empresas/modules/fundadores/services/fundadores.service";
import { ImagenesService } from "src/modules/empresas/modules/imagenes/services/imagenes.service";
import { ServiciosService } from "src/modules/empresas/modules/servicios/services/servicios.service";
import { FamiliasService } from "src/modules/empresas/modules/familias/services/familias.service";
import { RubrosEmpresasService } from "src/modules/empresas/modules/rubros/modules/rubros-empresas/services/rubros-empresas.service";
import { ItemsService } from "src/modules/empresas/modules/items/services/items.service";
import { EmpresasTiposSocietariosService } from "src/modules/empresas/modules/tipos-societarios/modules/empresas-tipos-societarios/services/empresas-tipos-societarios.service";
import { SedesService } from "src/modules/empresas/modules/sedes/services/sedes.service";
import { MunicipiosEmpresaService } from "src/modules/empresas/modules/municipios/modules/municipios-empresa/services/municipios-empresa.service";
import { OperacionesInternacionalesService } from "src/modules/empresas/modules/operaciones-internacionales/services/operaciones-internacionales.service";
import { PremiosService } from "src/modules/empresas/modules/premios/services/premios.service";
import { ImplementacionesService } from "src/modules/empresas/modules/implementaciones/services/implementaciones.service";
import { HitosService } from "src/modules/empresas/modules/hitos/services/hitos.service";

@Injectable()
export class FormularioService {
    constructor(
        private readonly dataSource: DataSource,
        private readonly tamaniosEmpresasService: TamaniosEmpresasService,
        private readonly empresasService: EmpresasService,
        private readonly fundadoresService: FundadoresService,
        private readonly imagenesService: ImagenesService,
        private readonly serviciosService: ServiciosService,
        private readonly familiasService: FamiliasService,
        private readonly rubrosEmpresasService: RubrosEmpresasService,
        private readonly itemsService: ItemsService,
        private readonly empresasTiposSocietariosService: EmpresasTiposSocietariosService,
        private readonly sedesService: SedesService,
        private readonly municipiosEmpresasService: MunicipiosEmpresaService,
        private readonly operacionesInternacionalesService: OperacionesInternacionalesService,
        private readonly premiosService: PremiosService,
        private readonly implementacionesService: ImplementacionesService,
        private readonly hitosService: HitosService
    ){}

    async registerEmpresa(data: RegisterEmpresaDto){
        return this.dataSource.transaction(async (manager) => {
            const tamanioEmpresa = await this.tamaniosEmpresasService.findOne(data.tamanioEmpresa);
            const empresa = await this.empresasService.createTransaction(manager,data);
            const fundadores = await this.fundadoresService.createTransaction(manager,{
                idEmpresa: empresa.id,
                fundadores: data.fundadores
            });
            const imagenes = await this.imagenesService.createTransaction(manager,{
                idEmpresa: empresa.id,
                imagenes: data.imagenes
            });
            const servicios = await this.serviciosService.createTransaction(manager,{
                idEmpresa: empresa.id,
                servicio: data.servicios
            })
            const familia = await this.familiasService.createTransaction(manager,{
                idEmpresa: empresa.id,
                esFamiliar: data.familia.esFamiliar,
                anio: data.familia.anioDejo
            })
            const rubros = await this.rubrosEmpresasService.createTransaction(manager,{
                idEmpresa: empresa.id,
                ...data.rubros
            });
            const items = await this.itemsService.createTransaction(manager,{
                idEmpresa: empresa.id,
                items: data.items
            })
            const tiposSocietarios = await this.empresasTiposSocietariosService.createTransaction(manager,{
                idEmpresa: empresa.id,
                ...data.tiposSocietarios
            });
            const sedes = await this.sedesService.createTransaction(manager,{
                idEmpresa: empresa.id,
                sedes: data.sedes
            })
            const municipios = await this.municipiosEmpresasService.createTransaction(manager,{
                idEmpresa: empresa.id,
                municipios: data.municipios
            })
            const paisesOperaInternacionales = await this.operacionesInternacionalesService.createTransaction(manager,{
                idEmpresa: empresa.id,
                paisesOperaInternacionalmente: data.paisesOperaInternacionalmente
            })
            const reconocmienientos = await this.premiosService.createTransaction(manager,{
                idEmpresa: empresa.id,
                reconocimientos: data.reconocimientos
            })
            const implementacion = await this.implementacionesService.createTransaction(manager,{
                idEmpresa: empresa.id,
                ...data.implementacion
            })
            const hitos = await this.hitosService.createTransaction(manager,{
                idEmpresa: empresa.id,
                hitos: data.hitos
            })
            return empresa;
        });
    }
}