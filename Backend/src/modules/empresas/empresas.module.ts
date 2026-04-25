import { Module } from '@nestjs/common';
import { EmpresasService } from './services/empresas.service';
import { EmpresasController } from './api/empresas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empresa } from './entities/empresa.entity';
import { InvestigadorEmpresa } from 'src/modules/usuarios/entities/investigador-empresa.entity';
import { ServiciosModule } from './modules/servicios/servicios.module';
import { PaisesModule } from './modules/paises/paises.module';
import { AccionesModule } from './modules/acciones/acciones.module';
import { EmpresasStatisticsService } from './services/empresas-statistics.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Empresa, InvestigadorEmpresa]),
        AccionesModule
    ],
    controllers: [EmpresasController],
    providers: [EmpresasService,EmpresasStatisticsService],
    exports: [EmpresasService,EmpresasStatisticsService]
})
export class EmpresasModule { }
