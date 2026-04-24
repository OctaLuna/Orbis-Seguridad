import { Module } from "@nestjs/common";
import { FormularioService } from "./services/formulario.service";
import { FormularioController } from "./api/formulario.controller";
import { TamaniosEmpresasModule } from "src/modules/empresas/modules/tamanios-empresas/tamanios-empresas.module";
import { FundadoresModule } from "src/modules/empresas/modules/fundadores/fundadores.module";
import { EmpresasModule } from "src/modules/empresas/empresas.module";
import { ImagenesModule } from "src/modules/empresas/modules/imagenes/imagenes.module";
import { ServiciosModule } from "src/modules/empresas/modules/servicios/servicios.module";
import { FamiliasModule } from "src/modules/empresas/modules/familias/familias.module";
import { RubrosEmpresasModule } from "src/modules/empresas/modules/rubros/modules/rubros-empresas/rubros-empresas.module";
import { ItemsModule } from "src/modules/empresas/modules/items/items.module";
import { EmpresasTiposSocietariosModule } from "src/modules/empresas/modules/tipos-societarios/modules/empresas-tipos-societarios/empresas-tipos-societarios.module";
import { SedesModule } from "src/modules/empresas/modules/sedes/sedes.module";
import { MunicipiosEmpresaModule } from "src/modules/empresas/modules/municipios/modules/municipios-empresa/municipios-empresa.module";
import { OperacionesInternacionalesModule } from "src/modules/empresas/modules/operaciones-internacionales/operaciones-internacionales.module";
import { PremiosModule } from "src/modules/empresas/modules/premios/premios.module";
import { ImplementacionesModule } from "src/modules/empresas/modules/implementaciones/implementaciones.module";
import { HitosModule } from "src/modules/empresas/modules/hitos/hitos.module";

@Module({
    imports: [
        TamaniosEmpresasModule,
        FundadoresModule,
        EmpresasModule,
        ImagenesModule,
        ServiciosModule,
        FamiliasModule,
        RubrosEmpresasModule,
        ItemsModule,
        EmpresasTiposSocietariosModule,
        SedesModule,
        MunicipiosEmpresaModule,
        OperacionesInternacionalesModule,
        PremiosModule,
        ImplementacionesModule,
        HitosModule,
    ],
    providers: [FormularioService],
    controllers: [FormularioController]
})
export class FormularioModule { }