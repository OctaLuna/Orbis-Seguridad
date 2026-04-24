import { Module } from "@nestjs/common";
import { EmpresasModule } from "src/modules/empresas/empresas.module";
import { DashboardService } from "./services/dashboard.service";
import { DashboardController } from "./api/dashboard.controller";
import { RubrosModule } from "src/modules/empresas/modules/rubros/rubros.module";
import { DepartamentosModule } from "src/modules/empresas/modules/departamentos/departamentos.module";
import { HitosModule } from "src/modules/empresas/modules/hitos/hitos.module";

@Module({
    imports: [
        EmpresasModule,
        RubrosModule,
        DepartamentosModule,
        HitosModule,
    ],
    providers: [DashboardService],
    controllers: [DashboardController],
    exports: [DashboardService]
})
export class DashboardModule {}